import { useAuth0 } from "@auth0/auth0-react";
import AccountService from "../services/AccountService";
import { useQuery } from "@tanstack/react-query";

export const useAccountExistence = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchAccountSetupStatus = async () => {
    if (user?.sub) {
      const accessToken = await getAccessTokenSilently();
      const { data } = await AccountService.isAccountSetup(
        user?.sub,
        accessToken
      );
      if (data) {
        return true;
      }
    }
    return false;
  };

  const { data: isAccountSetup, isSuccess } = useQuery({
    queryKey: ["accountSetupStatus"],
    queryFn: fetchAccountSetupStatus,
  });

  return { isAccountSetup: isSuccess ? isAccountSetup : true };
};
