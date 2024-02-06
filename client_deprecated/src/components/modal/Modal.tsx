import { ReactNode } from "react";
import OutsideAlerter from "../outside-alerter/OutsideAlerter";
import ButtonLight from "../button/button-light/ButtonLight";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  header?: string;
  children?: ReactNode;
};

const Modal = ({ isOpen, closeModal, header = "", children }: Props) => {
  return isOpen ? (
    <>
      <div className="navbar-canvas-backdrop"></div>
      <OutsideAlerter executable={closeModal} className="z-50">
        <div
          className={`fixed ${
            isOpen ? "fade-in" : ""
          } bg-white duration-200 ease-in left-1/2 top-24 -translate-x-1/2 w-[48rem] border rounded border-zinc-300 drop-shadow`}
        >
          <header className="flex items-center p-3 border-b border-zinc-300">
            <h4>{header}</h4>
            <ButtonLight onClick={closeModal} className="ml-auto">
              <i className="fa-solid fa-xmark"></i>
            </ButtonLight>
          </header>
          {children}
        </div>
      </OutsideAlerter>
    </>
  ) : null;
};

export default Modal;
