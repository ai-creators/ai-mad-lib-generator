import { Link } from "react-router-dom";
import Container from "../container/Container";

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-600">
      <Container className="p-2 flex justify-between items-center relative">
        <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Ai Adlibs</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/" className="py-2 px-2 block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse" className="py-2 px-2 block">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/saves" className="py-2 px-2 block">
              Saves
            </Link>
          </li>
          <li>
            <Link to="/" className="py-2 px-2 block">
              Settings
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
