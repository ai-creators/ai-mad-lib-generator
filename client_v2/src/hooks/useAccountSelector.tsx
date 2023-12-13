import { useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import { useAuth0 } from "@auth0/auth0-react";
import { AccountModel } from "../models/AccountModel";

export const useAccountSelector = (): {
  account: AccountModel | null;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (user?.sub) {
        const accessToken = await getAccessTokenSilently();
        const { data } = await AccountService.getAccountBySub(
          user.sub,
          accessToken
        );
        return { account: data, isLoading };
      }
      setIsLoading(false);
    })();
  }, [user?.sub]);
  return { account: null, isLoading };
};
