import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // queryFn: (id)=> deleteCabin(id), // -> since they has the same argument
    mutationFn: deleteCabinApi,
    // mutationFn: deleteCabin, name should be d/t from the mutate function
    onSuccess: () => {
      toast.success('Cabin Successully deleted!');

      queryClient.invalidateQueries({
        queryKey: ['cabins'], // he same name as in the useQuery to get the cabins, remember that?
      });
    },
    onError: err => {
      console.log(err);
      toast.error(err.message);
    }
  });

  return { isDeleting, deleteCabin };

}