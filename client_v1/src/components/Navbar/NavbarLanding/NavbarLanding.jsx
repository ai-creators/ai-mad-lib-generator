import { Link } from "react-router-dom";
import Container from "../../Container/Container";

const NavbarLanding = () => {
  return (
    <nav className="bg-zinc-950 text-white border-b border-zinc-600">
      <Container className="p-3">
        <Link to="/" className="py-2">
          <h1>Ai Ad Libs</h1>
        </Link>
      </Container>
    </nav>
  );
};

export default NavbarLanding;
