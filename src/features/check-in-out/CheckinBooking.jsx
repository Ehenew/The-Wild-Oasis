import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { box } from '../../styles/GlobalStyles';

import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import { formatCurrency } from '../../utils/helpers';
import { useBooking } from '../../features/bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './useCheckin';
import { useSettings } from '../../features/settings/useSettings';


const Box = styled.div`
${box}
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const { checkin, isCheckingIn } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        }
      });
    }
    else {
      checkin({ bookingId, breakfast: {} });
    }
  }


  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type='horizontal'>
        <Heading type='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox
          id='breakfast'
          onChange={() => {
            setAddBreakfast(add => !add);
            setConfirmPaid(false);
          }
          }>
          Add breakfast for {formatCurrency(optionalBreakfastPrice)}</Checkbox>
      </Box>
      }
      <Box>
        <Checkbox
          id='confirm'
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid(confirm => !confirm)}>
          I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}</Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
