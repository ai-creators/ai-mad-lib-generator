import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavbarNotSignedIn = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
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
        <Link to="/saves" className="p-3">
          Saves
        </Link>
      </li>
      <li>
        <button onClick={handleLogin} className="p-3">
          Log in
        </button>
      </li>
      <li>
        <button onClick={handleSignup} className="p-3">
          Sign up
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

export default NavbarNotSignedIn;
