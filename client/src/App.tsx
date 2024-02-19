import { ThemeProvider } from "./context/themeProvider";
import Auth0ProviderWithNavigate from "./features/auth/Auth0ProviderWithNavigate";
import PageRoutes from "./page/PageRoutes";
import { useAccount } from "./hooks/useAccount";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/loader/page-loader/PageLoader";

function App() {
  const { isLoading } = useAuth0();
  console.log("IS LOADING: ", isLoading);
  const {} = useAccount();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <ThemeProvider>
        <PageRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
