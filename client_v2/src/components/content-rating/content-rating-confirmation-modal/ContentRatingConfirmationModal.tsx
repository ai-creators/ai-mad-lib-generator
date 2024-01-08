import { Dispatch, SetStateAction } from "react";
import ButtonLightOutline from "../../button/button-light-outline/ButtonLightOutline";
import ButtonLight from "../../button/button-light/ButtonLight";
import Modal from "../../modal/Modal";
import { ContentRating } from "../../../models/ContentRating";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  setContentRating: Dispatch<SetStateAction<ContentRating>>;
};

const ContentRatingConfirmationModal = ({
  isOpen,
  closeModal,
  setContentRating,
}: Props) => {
  const confirmContentChange = () => {
    setContentRating(ContentRating.NSFW);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <h3 className="text-2xl font-semibold">Are you sure?</h3>
          <p>
            The content that you view from other users will be unfiltered. Do
            you want to continue?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonLightOutline onClick={confirmContentChange}>
            Continue
          </ButtonLightOutline>
          <ButtonLight onClick={closeModal}>Cancel</ButtonLight>
        </div>
      </div>
    </Modal>
  );
};

export default ContentRatingConfirmationModal;
