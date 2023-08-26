import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavbarNotSignedInCanvas = ({ closeCanvas }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
    closeCanvas();
  };

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
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
          to="/saves"
          className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={closeCanvas}
        >
          Saves
        </Link>
      </li>
      <li>
        <button
          className="text-start w-full p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={handleLogin}
        >
          Log in
        </button>
      </li>
      <li>
        <button
          className="text-start w-full p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
          onClick={handleSignup}
        >
          Sign up
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

export default NavbarNotSignedInCanvas;
