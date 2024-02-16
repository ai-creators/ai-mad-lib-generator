import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import NotFound from "./not-found/NotFound";
import Browse from "./browse/Browse";
import Adlib from "./adlib/Adlib";
import AdlibPlay from "./adlib/adlib-play/AdlibPlay";
import AdlibView from "./adlib/adlib-view/AdlibView";
import Saves from "./saves/Saves";
import Settings from "./settings/Settings";
import Categories from "./categories/Categories";
import Category from "./category/Category";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="settings" element={<Settings />} />
      <Route path="saves" element={<Saves />} />
      <Route path="adlib/view/:adlibResponseId" element={<AdlibView />} />
      <Route path="adlib/:adlibId/play" element={<AdlibPlay />} />
      <Route path="adlib/:adlibId" element={<Adlib />} />
      <Route path="browse" element={<Browse />} />
      <Route path="categories/:categoryName" element={<Category />} />
      <Route path="categories" element={<Categories />} />
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
