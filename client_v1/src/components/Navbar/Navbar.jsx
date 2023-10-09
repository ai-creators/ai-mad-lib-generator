import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useState } from "react";
import NavbarCanvas from "./NavbarCanvas/NavbarCanvas";
import NavbarNotSignedIn from "./NavbarNotSIgnedIn/NavbarNotSignedIn";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarSignedIn from "./NavbarSignedIn/NavbarSignedIn";

const Navbar = () => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  return (
    <nav className="bg-zinc-950 text-white border-b border-zinc-600">
      <Container className="py-3 p-3 lg:p-0 flex justify-between items-center">
        <Link to="/" className="py-3">
          <h1 className="text-lg font-semibold">Ai Ad-Libs</h1>
        </Link>
        <button
          className="w-10 h-10 rounded ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800 sm:hidden"
          onClick={() => setIsCanvasOpen((curr) => !curr)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        {isAuthenticated ? <NavbarSignedIn /> : <NavbarNotSignedIn />}
        <NavbarCanvas
          isOpen={isCanvasOpen}
          setIsOpen={setIsCanvasOpen}
          isAuthenticated={isAuthenticated}
        />
      </Container>
    </nav>
  );
};

export default Navbar;
