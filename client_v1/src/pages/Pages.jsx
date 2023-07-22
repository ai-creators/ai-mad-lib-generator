import Landing from "./Landing/Landing";
import { Routes, Route } from "react-router-dom";
import Libs from "./Libs/Libs";
import LibsBrowse from "./Libs/LibsBrowse/LibsBrowse";
import LibsPlay from "./Libs/LibsPlay/LibsPlay";

const Pages = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="landing" element={<Landing />} />
      <Route path="libs" element={<Libs />}></Route>
      <Route path="libs/browse" element={<LibsBrowse />} />
      <Route path="libs/play" element={<LibsPlay />} />
    </Routes>
  );
};

export default Pages;
