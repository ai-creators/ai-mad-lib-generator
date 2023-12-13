import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import AccountService from "./services/AccountService";
import { setAccount } from "./slices/accountSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import PageLoader from "./components/loader/page-loader/PageLoader";
import AccountDoesNotExistBanner from "./banners/account-does-not-exist-banner/AccountDoesNotExistBanner";
import PageRoutes from "./pages/PageRoutes";

function App() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setIsAccountLoading(true);
      if (user?.sub) {
        const accessToken = await getAccessTokenSilently();
        const { data } = await AccountService.getAccountBySub(
          user.sub,
          accessToken
        );
        if (data) {
          dispatch(setAccount(data));
        }
      }
      setIsAccountLoading(false);
    })();
  }, [user?.sub]);

  if (isLoading || isAccountLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? <AccountDoesNotExistBanner /> : null}
      <PageRoutes />
    </>
  );
}

export default App;
