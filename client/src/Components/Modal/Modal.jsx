import React from "react";

const Modal = ({ header, children, body, isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    isOpen && (
      <>
        <div className="modal-backdrop" onClick={closeModal}></div>
        <article className="modal bg-white border rounded w-[24rem]">
          <header className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">{header}</h3>
            <button
              className="h-8 w-8 rounded  hover:bg-neutral-100 active:bg-neutral-200"
              onClick={closeModal}
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </header>
          <section className="p-4">
            <p>{body}</p>
            {children}
          </section>
        </article>
      </>
    )
  );
};

export default Modal;
