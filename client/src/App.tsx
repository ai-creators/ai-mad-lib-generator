import { ThemeProvider } from "./context/themeProvider";
import GlobalErrorAlert from "./errors/global-error-alert/GlobalErrorAlert";
import { useAppSelector } from "./hooks/useAppSelector";
import PageRoutes from "./page/PageRoutes";

function App() {
  const { globalError } = useAppSelector((state) => state.globalError);
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
