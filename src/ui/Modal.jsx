import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


// Compound Component Pattern
// 1. Create Context
const ModalContext = createContext();

// 2. Create the parent Component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;
  // const open = (name) => setOpenName(name); same as the above


  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// Creating child components
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  // Now, we want to add the open event handler function to the Button inside the Modal.Open component, but how can we do that? Well, cloneElement will solve this- cloning the comming component and add whatever we want into it, don't over-use it however

  // AddCabin.jsx
  // <Modal>
  //       <Modal.Open opens='cabin-form'>
  //         <Button>Add new Cabin</Button>
  //       </Modal.Open>
  //       <Modal.Window name='cabin-form'>
  //         <CreateCabinForm />
  //       </Modal.Window>
  // </Modal>


  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  // we cloned the children, in order to pass the onCloseModal prop which was used to style the CreateCabinForm conditionally

  // ReactDOM.createPortal is used to render a component outside its parent DOM hierarchy while keeping it within React's tree. This is useful for rendering modals, tooltips, or pop-ups that need to break out of overflow or z-index constraints. 
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}><HiXMark /></Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4. Add child compnents as properties to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
