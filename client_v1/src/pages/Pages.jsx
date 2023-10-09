import { Routes, Route } from "react-router-dom";
import Libs from "./Libs/Libs";
import LibsPlay from "./Libs/LibsPlay/LibsPlay";
import Browse from "./Browse/Browse";
import NotFound from "./NotFound/NotFound";
import Saves from "./Saves/Saves";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import Auth0ProtectedRoute from "../auth/Auth0ProtectedRoute/Auth0ProtectedRoute";
import Lib from "../api/Lib";

const Pages = () => {
  return (
    <Routes>
      {/* <Route index element={<Landing />} />
      <Route path="landing" element={<Landing />} /> */}
      <Route index element={<Libs />}></Route>
      <Route path="libs/browse" element={<Browse />} />
      <Route path="libs/play" element={<LibsPlay />} />
      <Route path="saves" element={<Saves />} />
      <Route path="settings" element={<Settings />} />
      <Route
        path="profile"
        element={
          <Auth0ProtectedRoute>
            <Profile />
          </Auth0ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
