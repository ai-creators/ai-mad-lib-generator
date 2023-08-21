import { Link } from "react-router-dom";

const NavbarNotSignedInCanvas = ({ closeCanvas }) => {
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
          to="/saves"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={closeCanvas}
        >
          Saves
        </Link>
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

export default NavbarNotSignedInCanvas;
