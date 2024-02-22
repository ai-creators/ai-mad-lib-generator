import { accountService } from "@/services/AccountService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { setAccount } from "@/slices/accountSlice";
import { ErrorModel } from "@/models/ErrorModel";

export const useAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const {
    getAccessTokenSilently,
    isAuthenticated,
    user,
    isLoading: isAuthLoading,
  } = useAuth0();
  const { account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isComponentMounted = true;
    (async () => {
      setIsLoading(true);
      if (!isAuthLoading && isAuthenticated && user?.sub && !account.username) {
        const [foundAccount, apiError] = await accountService.getAccountBySub(
          user.sub,
          await getAccessTokenSilently()
        );

        if (apiError && isComponentMounted) {
          setError(apiError);
        }

        if (foundAccount && isComponentMounted) {
          dispatch(setAccount(foundAccount));
        }
      }
      setIsLoading(false);
    })();

    return () => {
      isComponentMounted = false;
    };
  }, [isAuthenticated]);

  return { error, isLoading };
};
