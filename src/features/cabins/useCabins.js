import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // geting cabins from our database with use query
  const { isLoading, data: cabins, error } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
  // console.log(isLoading, cabins, error);

  return { isLoading, cabins, error };
}