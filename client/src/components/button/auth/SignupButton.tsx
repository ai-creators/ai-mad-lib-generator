import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  className?: string;
};

const SignupButton = ({ className = "" }: Props) => {
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
    <Button variant="outline" className={`${className}`} onClick={handleSignUp}>
      Create Account
    </Button>
  );
};

export default SignupButton;
