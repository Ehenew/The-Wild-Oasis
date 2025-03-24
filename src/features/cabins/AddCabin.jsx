import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  // Since we are using the compound component pattern, we don't need any state inside this

  /*
  return <Modal>
    <Modal.Open opens='cabin-form'>
      <Button>Add new Cabin</Button>
    </Modal.Open>
    <Modal.Window name='cabin-form'>
      <CreateCabinForm />
    </Modal.Window>

    <Modal.Open opens='table'>
      <Button>Show Table</Button>
    </Modal.Open>
    <Modal.Window name='table'>
      <CabinTable />
    </Modal.Window>
  </Modal>;
  */

  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

/*
function AddCabin() {
// Note: The AddCabin component should not be responsible to know whether the modal is currently open or not rather is should be the modal itself know whether it is open or not. And so, to achieve this we can use the prettie advanced react pattern the compound component pattern 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen(show => !show)}>Add new Cabin</Button>
      {
        isModalOpen && <Modal onClose={() => setIsModalOpen(false)}><CreateCabinForm onCloseModal={() => setIsModalOpen(false)} /></Modal>
      }
    </div>
  );
}
*/

export default AddCabin;
