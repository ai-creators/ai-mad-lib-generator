import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  className?: string;
};
const LogoutButton = ({ className = "" }: Props) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button variant="ghost" className={className} onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
