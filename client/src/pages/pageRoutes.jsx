import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Create from "./Create/Create";
import LibCreator from "./LibCreator/LibCreator";
import LibViewer from "./LibViewer/LibViewer";
import Browse from "./Browse/Browse";
import Saves from "./Saves/Saves";
import Landing from "./Landing/Landing";

const PageRoutes = () => {
  console.log("RE RENDER IN PAGE ROUTES");
  return (
    <Routes>
      {/* <Route index element={<Landing />} /> */}
      {/* <Route path="/dashboard" element={<Create />} /> */}
      <Route path="/" element={<Create />} />
      <Route path="/lib" element={<LibViewer />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/saves" element={<Saves />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
