import { ThemeProvider } from "./context/themeProvider";
import PageRoutes from "./page/PageRoutes";

function App() {
  return (
    <>
      <ThemeProvider>
        <PageRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
