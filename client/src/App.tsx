import { Provider } from "react-redux";
import { ThemeProvider } from "./context/themeProvider";
import Auth0ProviderWithNavigate from "./features/auth/Auth0ProviderWithNavigate";
import PageRoutes from "./page/PageRoutes";
import { setupStore } from "./store/store";

const store = setupStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <ThemeProvider>
            <PageRoutes />
          </ThemeProvider>
        </Auth0ProviderWithNavigate>
      </Provider>
    </>
  );
}

export default App;
