import { useAuth0 } from "@auth0/auth0-react";
import ButtonLight from "../button-light/ButtonLight";

const ButtonLogin = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return <ButtonLight onClick={handleLogin}>Log In</ButtonLight>;
};

export default ButtonLogin;
