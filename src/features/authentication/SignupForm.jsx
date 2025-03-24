import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSignup } from "./useSignup";
import { useLocation, useNavigate } from "react-router-dom";

// Email regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function SignupForm() {
  const { isLoading, signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const navigate = useNavigate();

  function onSubmit({ fullName, email, password }) {
    // console.log(fullName, email, password);
    // console.log(data);
    // we don't need the password confirm, we only need it in the react form
    signup({ fullName, email, password }, {
      onSettled: reset
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type='signup'>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please provide a valid email address"
            },

          })}
        />
      </FormRow >

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          disabled={isLoading}
          id="password"{...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters"
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Password does not match"
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => isSignup ? navigate(-1) : reset}
        >
          {isSignup ? 'Back' : 'Cancel'}
        </Button>
        <Button disabled={isLoading}>{isSignup ? 'Signup' : 'Create new user'}</Button>
      </FormRow>
    </Form >
  );
}

export default SignupForm;
