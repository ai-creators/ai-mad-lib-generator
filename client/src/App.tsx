import { ThemeProvider } from "./context/themeProvider";
import PageRoutes from "./page/PageRoutes";
import { useAccount } from "./hooks/useAccount";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/loader/page-loader/PageLoader";
import CreateAccountBanner from "./components/banner/create-account-banner/CreateAccountBanner";

function App() {
  const { isLoading: isAuthLoading } = useAuth0();
  const { isLoading } = useAccount();

  if (isAuthLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <ThemeProvider>
        <CreateAccountBanner isLoading={isLoading} />
        <PageRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
