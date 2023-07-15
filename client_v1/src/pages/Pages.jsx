import Landing from "./Landing/Landing";
import { Routes, Route } from "react-router-dom";
import Libs from "./Libs/Libs";
import LibsBrowse from "./Libs/LibsBrowse/LibsBrowse";

const Pages = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="landing" element={<Landing />} />
      <Route path="libs" element={<Libs />}>
        <Route path="browse" element={<LibsBrowse />} />
      </Route>
    </Routes>
  );
};

export default Pages;
