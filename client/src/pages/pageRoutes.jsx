import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import Home from "./Home/Home";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
