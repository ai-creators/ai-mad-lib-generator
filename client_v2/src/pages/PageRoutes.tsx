import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../components/loader/page-loader/PageLoader";
import Layout from "../layout/Layout";
import HomePage from "./home/HomePage";
import NotFoundPage from "./not-found/NotFoundPage";
import AccountSetupPage from "./account/setup/AccountSetupPage";
import PlayPage from "./adlib/play/PlayPage";
import ProfilePage from "./profile/ProfilePage";
import ViewPage from "./adlib/view/ViewPage";
import AdlibPage from "./adlib/AdlibPage";
import CategoriesPage from "./adlib/categories/CategoriesPage";

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
      <Route path="adlib/:adlibId" element={<AdlibPage />} />
      <Route path="adlib">
        <Route path="categories/:categoryName" element={<CategoriesPage />} />
        <Route path="play/:adlibId" element={<PlayPage />} />
        <Route path="view/:adlibResponseId" element={<ViewPage />} />
      </Route>
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route path="account">
        <Route path="setup" element={<AccountSetupPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
