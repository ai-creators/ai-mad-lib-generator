import Landing from "./Landing/Landing";
import { Routes, Route } from "react-router-dom";

const Pages = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
    </Routes>
  );
};

export default Pages;
