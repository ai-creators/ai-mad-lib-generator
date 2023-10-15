import ButtonClear from "../../Button/ButtonClear/ButtonClear";
import ButtonPrimary from "../../Button/ButtonPrimary/ButtonPrimary";
import Modal from "../../Modal/Modal";

const ContentRatingModalConfirm = ({ isOpen, setIsOpen, changeRating }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    isOpen && (
      <Modal closeModal={closeModal} isOpen={isOpen}>
        <div className="p-5 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl font-semibold">Are you sure?</h3>
            <p>
              The content that you view from other users will be unfiltered. Do
              you want to continue?
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="p-3 rounded border border-zinc-600 text-white inline-block hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
              onClick={changeRating}
              id="nsfw"
            >
              Continue
            </button>
            <ButtonClear onClick={closeModal}>Cancel</ButtonClear>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ContentRatingModalConfirm;
