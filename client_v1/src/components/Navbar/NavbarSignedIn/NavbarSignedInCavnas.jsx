import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavbarSignedInCavnas = ({ closeCanvas }) => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    closeCanvas();
  };

  return (
    <ul>
      <li>
        <Link
          to="/"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800 "
          onClick={closeCanvas}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/libs/browse"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={closeCanvas}
        >
          Browse
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={closeCanvas}
        >
          Profile
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="text-start w-full p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
        >
          Logout
        </button>
      </li>
      <li>
        <Link
          to="/settings"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={closeCanvas}
        >
          Settings
        </Link>
      </li>
    </ul>
  );
};

export default NavbarSignedInCavnas;
