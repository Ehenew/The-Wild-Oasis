import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import ButtonText from '../../ui/ButtonText';

import { useBooking } from './useBooking';
import { useCheckout } from '../../features/check-in-out/useCheckout';
import { useDeleteBooking } from '../../features/bookings/useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { deleteBooking, isDeleting } = useDeleteBooking();


  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };


  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >Check in
          </Button>)
        }

        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}
          >Check out
          </Button>)
        }

        <Modal>
          <Modal.Open opens='delete'>
            <Button
              disabled={isDeleting}
              variation='danger'
              onClick={() => deleteBooking(bookingId)}
            > Delete Booking
            </Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resource='Booking'
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId, { onSettled: () => navigate(-1) })}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
