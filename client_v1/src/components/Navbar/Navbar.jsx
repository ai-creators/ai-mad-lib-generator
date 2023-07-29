import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useState } from "react";
import NavbarCanvas from "./NavbarCanvas/NavbarCanvas";

const Navbar = () => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  return (
    <nav className="bg-zinc-950 text-white border-b border-zinc-600">
      <Container className="py-3 flex justify-between items-center">
        <Link to="/" className="py-3">
          <h1 className="text-lg font-semibold">Ai Ad-Libs</h1>
        </Link>
        <button
          className="w-10 h-10 rounded ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800 sm:hidden"
          onClick={() => setIsCanvasOpen((curr) => !curr)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className="gap-3 hidden sm:flex">
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
        </ul>
        <NavbarCanvas isOpen={isCanvasOpen} setIsOpen={setIsCanvasOpen} />
      </Container>
    </nav>
  );
};

export default Navbar;
