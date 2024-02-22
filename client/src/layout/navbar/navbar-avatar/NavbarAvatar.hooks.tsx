import { useAppSelector } from "@/hooks/useAppSelector";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const useNavbarAvatar = () => {
  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);
  const { user, logout } = useAuth0();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return { handleLogout, account, user, handleRedirect };
};
