import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { Textarea } from '../../ui/Textarea';

import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);


  // while in editing session we want the previous values to be automatically pre-filled except for the image, and so to do this we can use the power of react-hook-form by passing options to set default values whenever we are on editing session
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });

  const { errors } = formState;
  // console.log(errors);

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === 'string' ? data.image : data.image[0] || '';
    // checks if image is newly selected or the previous one
    // image: FileList { 0: File, length: 1 }

    if (isEditSession) updateCabin(
      { newCabinData: { ...data, image: image }, id: editId },
      {
        onSuccess: () => {
          reset(); // clearing input  fields
          onCloseModal?.();
        }
      },
    );
    else createCabin(
      { ...data, image: image },
      {
        onSuccess: () => {
          reset(); // clearing input  fields
          onCloseModal?.();
        }
      },
    );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {
          ...register('name', { required: 'This field is required!' }) // must be the same as the id
          }
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {
          ...register('maxCapacity', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1"
            }
          },

          )
          }
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {
          ...register('regularPrice', { required: 'This field is required!' })
          }
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {
          ...register('discount', {
            required: 'This field is required!',
            validate: (value) => value <= getValues().regularPrice || 'Discount cannot be more than the regular price!'
          })
          }
        />
      </FormRow>

      <FormRow
        label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {
          ...register('description', { required: 'This field is required!' })
          }
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {
          ...register('image', { required: isEditSession ? false : 'This field is required!' })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Update Cabin' : 'Create New Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;;;
