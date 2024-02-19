import { accountService } from "@/services/AccountService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { setAccount } from "@/slices/accountSlice";
import { ErrorModel } from "@/models/ErrorModel";

export const useAccount = () => {
  const [error, setError] = useState<ErrorModel | null>(null);
  const { getAccessTokenSilently, isAuthenticated, user, isLoading } =
    useAuth0();
  const { account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!isLoading && isAuthenticated && user?.sub && !account.username) {
        const [foundAccount, apiError] = await accountService.getAccountBySub(
          user.sub,
          await getAccessTokenSilently()
        );

        if (apiError) {
          setError(apiError);
        }

        if (foundAccount) {
          dispatch(setAccount(foundAccount));
        }
      }
    })();
  }, []);

  return { error };
};
