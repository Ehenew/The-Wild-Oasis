import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Extract filter value from URL
  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null :
      { field: "status", value: filterValue };
  // { field: "totalPrice", value: 4000, method: 'gte' };

  // Sort
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data: { data: bookings, count } = {}, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Ensures data is refetched when the filter and sortBY changes, this is like a dependency array in the useEffect hook
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookins', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookins', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });

  return { isLoading, bookings, count, error };
}
