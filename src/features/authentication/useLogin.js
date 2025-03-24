import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();


  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user); // storing logged in user into cache

      navigate('/dashboard', { replace: true });
      toast.success('Login Successful');
    },
    onError: (error) => {
      console.error('ERROR', error.message);
      toast.error('Provided email or password are incorrect');
    }
  });

  return { login, isLoading };
}