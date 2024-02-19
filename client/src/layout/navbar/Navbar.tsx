import { Link } from "react-router-dom";
import Container from "../container/Container";
import NavbarMobile from "./navbar-mobile/NavbarMobile";
import SearchBar from "@/features/search/search-bar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarNotSignedIn from "./navbar-not-signed-in/NavbarNotSignedIn";
import NavbarSignedIn from "./navbar-signed-in/NavbarSignedIn";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="fixed top-0 w-full border-b shadow-sm z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="p-2 flex justify-between items-center relative">
        <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <li className="md:hidden">
            <NavbarMobile />
          </li>
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold py-2">Ai Adlibs</h1>
            </Link>
          </li>
          <li className="hidden md:block ml-3">
            <SearchBar width="w-80" />
          </li>
        </ul>
        {isAuthenticated ? <NavbarSignedIn /> : <NavbarNotSignedIn />}
      </Container>
    </nav>
  );
};

export default Navbar;
