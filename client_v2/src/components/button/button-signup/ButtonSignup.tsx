import { useAuth0 } from "@auth0/auth0-react";
import ButtonLightOutline from "../button-light-outline/ButtonLightOutline";

const ButtonSignup = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/account/setup",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <ButtonLightOutline className="p-3" onClick={handleSignUp}>
      Create Account
    </ButtonLightOutline>
  );
};

export default ButtonSignup;
