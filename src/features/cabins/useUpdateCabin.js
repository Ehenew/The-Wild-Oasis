import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    // the mutationFn can only accept only one element, that is why we accept it as an object and immidiately destructured it
    onSuccess: () => {
      toast.success('Cabin successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      // reset(); 
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  return { isUpdating, updateCabin };
}