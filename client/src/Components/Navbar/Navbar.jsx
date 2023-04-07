import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <div className="max-w-4xl mx-auto flex justify-between px-4">
        <Link to="/">
          <h1 className="font-semibold text-xl">Mad Lib Generator</h1>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="p-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse" className="p-2">
              Browse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
