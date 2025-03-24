import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { Textarea } from '../../ui/Textarea';

import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  // console.log(errors);

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset(); // resetting form inputs
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  function onSubmit(data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    // console.log(errors);
  }
  // By default, validation happens the moment we submit the form, so when we call handleSubmit. From them on, validation happens on the onChange event [demonstrate]. We cah change that by passing options into useForm ('mode' and 'reValidateMode')
  // https://react-hook-form.com/api/useform

  // The registered names need to be the same as in the Supabase table. This makes it easier to send the request
  // "handleSubmit" will validate your inputs before invoking "onSubmit"

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {
          ...register('name', { required: 'This field is required!' }) // must be the same as the id
          }
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
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
          disabled={isCreating}
          {
          ...register('regularPrice', { required: 'This field is required!' })
          }
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {
          ...register('discount', {
            required: 'This field is required!',
            validate: (value) => value <= getValues().regularPrice || 'Discount should be less than the regular price!'
          })
          }
        />
      </FormRow>

      <FormRow
        label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isCreating}
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
          ...register('image', { required: 'This field is required!' })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
