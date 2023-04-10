import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarBurger from "./NavbarBurger/NavbarBurger";
import NavbarCanvas from "./NavbarCanvas/NavbarCanvas";
const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNav = () => {
    setIsNavbarOpen((c) => !c);
  };
  return (
    <nav className="py-4 border-b">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <h1 className="font-semibold text-xl">Mad Lib Generator</h1>
        </Link>
        <NavbarBurger toggleNav={toggleNav} />
        <ul className="hidden md:flex gap-4">
          <li>
            <Link to="/" className="p-2" id="home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse" className="p-2">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/saves" className="p-2">
              Saves
            </Link>
          </li>
        </ul>
        <NavbarCanvas
          setIsNavbarOpen={setIsNavbarOpen}
          isNavbarOpen={isNavbarOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
