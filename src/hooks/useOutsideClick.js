import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(function () {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // document.addEventListener('click', handleClickOutside);
    //  however doing this has problems, the modal cannot be open from the start because of event bubbling
    // The modal closes immediately when opened due to event bubbling. When clicking the button to open the modal, the click event bubbles up to the document before the modal is fully rendered. This triggers closeModal(), detecting an "outside click." The solution: Use { capture: true } in addEventListener to handle clicks in the capturing phase, ensuring the event is caught before bubbling affects the modal.
    document.addEventListener('click', handleClickOutside, listenCapturing);

    return () => document.removeEventListener('click', handleClickOutside, listenCapturing); // clearing event listeners from the dom

  }, [handler, listenCapturing]);

  return ref;
}