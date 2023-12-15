import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../components/loader/page-loader/PageLoader";
import Layout from "../layout/Layout";
import { AuthenticationGuard } from "../guards/AuthenticationGuard";
import HomePage from "./home-page/HomePage";
import NotFoundPage from "./not-found-page/NotFoundPage";
import AccountSetupPage from "./account/setup/AccountSetupPage";

const PageRoutes = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    <Layout>
      <PageLoader />
    </Layout>;
  }
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="account">
        <Route path="setup" element={<AccountSetupPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
