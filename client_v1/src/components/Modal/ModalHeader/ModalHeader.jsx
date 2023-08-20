const ModalHeader = ({ closeModal, header }) => {
  return (
    <div className="p-3 border-b flex justify-end">
      <button
        onClick={closeModal}
        id="modal-close-button"
        className="p-3 rounded border border-zinc-600 text-white inline-block mt-6 hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
      >
        Close
      </button>
    </div>
  );
};

export default ModalHeader;
