const ModalHeader = ({ closeModal, header }) => {
  return (
    <div className="p-3 border-b-zinc-400 flex justify-end items-center">
      <button
        onClick={closeModal}
        id="modal-close-button"
        className="p-3 rounded border-zinc-600 text-white inline-block hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
      >
        Close
      </button>
    </div>
  );
};

export default ModalHeader;
