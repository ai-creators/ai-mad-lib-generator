import { useAuth0 } from "@auth0/auth0-react";

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
    <button className="p-3" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default ButtonSignup;
