import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      // reset(); // we cannot use the reset function right here, b/c it is a function that is given to us by the -react-hook-form which only works inside the component, but likey for us we can pass onSuccess method inside a component and we can do the ressetting there
    },
    onError: err => {
      toast.error(err.message);
    }
  });

  return { isCreating, createCabin };
}