import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavbarSignedIn = () => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <ul className="gap-3 hidden sm:flex items-center">
      <li>
        <Link to="/" className="p-3">
          Home
        </Link>
      </li>
      <li>
        <Link to="/libs/browse" className="p-3">
          Browse
        </Link>
      </li>
      <li>
        <Link to="/profile" className="p-3">
          Profile
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className="p-3">
          Logout
        </button>
      </li>
      <li>
        <Link to="/settings" className="p-3">
          Settings
        </Link>
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
