import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      // console.log(user);
      toast.success("Account successfully created. Please verify your email address!");
      navigate('/login');
    }
  });

  return { isLoading, signup };
}