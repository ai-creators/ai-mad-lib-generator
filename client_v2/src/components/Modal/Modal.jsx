import { useEffect } from "react";
import FocusTrap from "focus-trap-react";
import ModalHeader from "./ModalHeader/ModalHeader";
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";

const Modal = ({ isOpen, closeModal, header, children }) => {
  useEffect(() => {
    const escFunction = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escFunction, false);

    return () => {
      return document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  useDisableBodyScroll(isOpen ? JSON.stringify(isOpen) : null);

  return (
    isOpen && (
      <>
        <div className="modal-backdrop" onClick={closeModal}></div>
        <FocusTrap>
          <div className="border border-zinc-600 rounded-lg modal w-full min-[362px]:w-11/12 md:max-w-2xl max-h-[95%] overflow-y-auto bg-zinc-950 text-white z-100">
            <ModalHeader closeModal={closeModal} header={header} />
            {children}
          </div>
        </FocusTrap>
      </>
    )
  );
};

export default Modal;
