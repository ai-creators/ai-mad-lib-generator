import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";
import LibCreator from "./LibCreator/LibCreator";
import LibViewer from "./LibViewer/LibViewer";
import Browse from "./Browse/Browse";
import Saves from "./Saves/Saves";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/lib-create" element={<LibCreator />} />
      <Route path="/lib" element={<LibViewer />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/saves" element={<Saves />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
