import React from "react";

const Modal = () => {
  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white border rounded w-[24rem]">
        Modal
      </div>
    </>
  );
};

export default Modal;
