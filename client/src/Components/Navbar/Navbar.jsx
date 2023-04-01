import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="py-4 border-b px-2">
      <div className="container mx-auto">
        <Link to="/">
          <h1 className="font-semibold text-xl">Mad Lib Generator</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
