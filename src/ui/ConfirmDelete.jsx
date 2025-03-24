import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";


const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
  // onCloseModal comes from the parent modal window component passed to all the children inside the Modal.jsx👇 by passing it as a prop after cloning the children
  // <div>{cloneElement(children, { onCloseModal: close })}</div>



  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
