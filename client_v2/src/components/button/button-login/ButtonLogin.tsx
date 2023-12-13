import { useAuth0 } from "@auth0/auth0-react";

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

  return (
    <button className="p-3" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default ButtonLogin;
