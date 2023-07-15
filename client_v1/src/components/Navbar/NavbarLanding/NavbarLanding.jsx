import { Link } from "react-router-dom";
import Container from "../../Container/Container";

const NavbarLanding = () => {
  return (
    <nav className="bg-zinc-950 text-white border-b border-zinc-600">
      <Container className="p-3 flex justify-between items-center">
        <Link to="/" className="py-3">
          <h1 className="text-lg font-semibold">Ai Ad-Libs</h1>
        </Link>
        <ul className="flex gap-3">
          <li>
            <Link to="/" className="p-3">
              Home
            </Link>
          </li>
          <li>
            <Link to="/libs" className="p-3">
              Create
            </Link>
          </li>
          <li>
            <Link to="/libs/browse" className="p-3">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/libs/saves" className="p-3">
              Saves
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavbarLanding;
