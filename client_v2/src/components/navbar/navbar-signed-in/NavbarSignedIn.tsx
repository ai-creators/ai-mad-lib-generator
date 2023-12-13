import { Link } from "react-router-dom";
import NavbarAvatar from "../navbar-avatar/NavbarAvatar";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarSignedIn = () => {
  const { user } = useAuth0();
  return (
    <ul className="flex items-center gap-5">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/questions">Questions</Link>
      </li>
      <li>
        <NavbarAvatar avatarUrl={user?.picture} />
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
