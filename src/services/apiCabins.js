import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be Loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  let query = supabase.from('cabins');
  // 1. Create/edit cabin
  // A. CREATE
  if (!id)
    query =
      query
        .insert([{ ...newCabin, image: imagePath }]);

  if (id)
    // B. EDIT
    query =
      query
        .update({ ...newCabin, image: imagePath }) // notice this time we are not placing the object in an array
        .eq('id', id);

  const { data, error } = await query
    .select()
    .single(); // the insert and update function by default do not return the newly created row, and so if we want that row to be returned we have to chain the select and single methods on it


  if (error) {
    console.log(error);
    throw new Error("Cabin could not be Created");
  }

  // 2. Uploding photo
  if (hasImagePath) return data; // if there is already an image path, no need to re-upload

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
};