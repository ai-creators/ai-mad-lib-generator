import { Routes, Route } from "react-router-dom";
import Libs from "./Libs/Libs";
import LibsPlay from "./Libs/LibsPlay/LibsPlay";
import Browse from "./Browse/Browse";
import NotFound from "./NotFound/NotFound";
import Saves from "./Saves/Saves";
import Settings from "./Settings/Settings";
import LibViewerV1 from "../components/Libs/LibViewer/LiBViewerV1/LibViewerV1";

const Pages = () => {
  return (
    <Routes>
      {/* <Route index element={<Landing />} />
      <Route path="landing" element={<Landing />} /> */}
      <Route index element={<Libs />}></Route>
      <Route path="libs/browse" element={<Browse />} />
      {/* <Route path="libs/play" element={<LibsPlay />} /> */}
      <Route path="libs/play/:adlibid" element={<LibsPlay />} />
      <Route path="libs/view/:responseid" element={<LibViewerV1 />} />
      <Route path="saves" element={<Saves />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
