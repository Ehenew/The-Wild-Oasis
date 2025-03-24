import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "../bookings/BookingRow";
import Pagination from "../../ui/Pagination";

import { useBookings } from "./useBookings";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  // Note: This time we want to the filtering and sorting to be done by our api instead, we simply send a request our api with filtering object and the api will send us the filtered bookings all the time, then where should we pass that object to the api, well the useBookings function is the right place for this

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource={'bookings'} />;


  // Client-side filtering and sorting
  // const [searchParams] = useSearchParams();
  // // Filter
  // const filterValue = searchParams.get('status') || 'all';
  // let filteredBookings;
  // if (filterValue === 'all') filteredBookings = bookings;
  // else
  //   filteredBookings = bookings.filter(booking => booking.status === filterValue);

  // // Sort
  // const sortBy = searchParams.get('sortBy') || 'startDate-desc';
  // const [field, direction] = sortBy.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;

  // const sortedBookings = filteredBookings?.sort((a, b) => (a[field] - b[field]) * modifier);



  return (
    <Menus>
      {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))} */}

        {/* Render props!   */}
        <Table.Body
          data={bookings}
          // data={filteredBookings}
          // data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
