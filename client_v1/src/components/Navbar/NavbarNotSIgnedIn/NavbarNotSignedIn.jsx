import { Link } from "react-router-dom";

const NavbarNotSignedIn = () => {
  return (
    <ul className="gap-3 hidden sm:flex">
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
        <Link to="/saves" className="p-3">
          Saves
        </Link>
      </li>
      <li>
        <Link to="/settings" className="p-3">
          Settings
        </Link>
      </li>
    </ul>
  );
};

export default NavbarNotSignedIn;
