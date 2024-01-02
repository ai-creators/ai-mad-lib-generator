import ButtonLightOutline from "../../button/button-light-outline/ButtonLightOutline";
import ButtonLight from "../../button/button-light/ButtonLight";
import ButtonLogin from "../../button/button-login/ButtonLogin";
import ButtonSignup from "../../button/button-signup/ButtonSignup";
import Modal from "../../modal/Modal";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const AccountSetupModal = ({ isOpen, closeModal }: Props) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col items-center p-5 gap-5">
        <div>
          <h6 className="text-xl font-semibold text-center">
            Explore More: Sign Up for Full Access
          </h6>
          <p className="text-zinc-500 text-center max-w-lg">
            "Hello there! We noticed you haven't signed up yet. To experience
            the best of our platform, we encourage you to create an account.
            Here's what you're missing:
          </p>
        </div>

        <ul className="max-w-lg pl-3 list-disc">
          <li>
            <span className="font-semibold">Saving adlib prompts:</span> Keep
            track of your favorite adlibs by saving them directly to your
            account. This way, you can easily return to them whenever you like.
          </li>
          <li>
            <span className="font-semibold">Saving adlib responses:</span>
            Engage with the community by responding to adlibs. Share your
            creativity, get feedback, and interact with fellow users.
          </li>
          <li>
            <span className="font-semibold">Reacting to adlibs:</span>
            Express your opinion on adlibs by liking or disliking them. Your
            input helps tailor content recommendations and informs creators
            about the community's preferences.
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <ButtonSignup className="w-36" />
          <ButtonLogin className="w-36" />
        </div>
      </div>
    </Modal>
  );
};

export default AccountSetupModal;
