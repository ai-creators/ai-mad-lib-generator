import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

const LoginButton = ({ className = "" }: Props) => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button variant="ghost" onClick={handleLogin} className={className}>
      Log In
    </Button>
  );
};

export default LoginButton;
