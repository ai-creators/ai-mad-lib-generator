import NavbarSignedIn from "./navbar-signed-in/NavbarSignedIn";
import NavbarNotSignedIn from "./navbar-not-signed-in/NavbarNotSignedIn";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Container from "../container/Container";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="bg-white text-white border-b border-zinc-300 text-black">
      <Container className="p-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-lg font-semibold text-black">Ai Adlibs</h1>
        </Link>
        {isAuthenticated ? <NavbarSignedIn /> : <NavbarNotSignedIn />}
      </Container>
    </nav>
  );
};

export default Navbar;
