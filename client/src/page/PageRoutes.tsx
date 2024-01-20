import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default PageRoutes;
