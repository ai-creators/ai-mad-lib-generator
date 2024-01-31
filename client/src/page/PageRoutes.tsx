import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import NotFound from "./not-found/NotFound";
import Browse from "./browse/Browse";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="browse" element={<Browse />} />
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
