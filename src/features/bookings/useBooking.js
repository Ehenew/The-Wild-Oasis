import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking, error } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // by default react query tries to fetch 3 times
  });

  return { isLoading, booking, error };
}