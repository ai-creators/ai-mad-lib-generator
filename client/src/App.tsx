import { ThemeProvider } from "./context/themeProvider";
import GlobalErrorAlert from "./errors/global-error-alert/GlobalErrorAlert";
import { useAppSelector } from "./hooks/useAppSelector";
import PageRoutes from "./page/PageRoutes";
import { useUser } from "./hooks/useUser";
import PageLoader from "./components/loader/page-loader/PageLoader";

function App() {
  const { globalError } = useAppSelector((state) => state.globalError);
  const { isLoading } = useUser();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <ThemeProvider>
        <GlobalErrorAlert error={globalError} />
        <PageRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
