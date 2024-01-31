import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import NotFound from "./not-found/NotFound";
import Browse from "./browse/Browse";
import Adlib from "./adlib/Adlib";
import AdlibPlay from "./adlib/adlib-play/AdlibPlay";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="adlib/:adlibId" element={<Adlib />}>
        <Route path="play" element={<AdlibPlay />} />
      </Route>
      <Route path="browse" element={<Browse />} />
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
