import React from "react";
import { Link } from "react-router-dom";
const NavbarCanvas = ({ isNavbarOpen, setIsNavbarOpen }) => {
  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };
  return (
    <div
      id="menu-id"
      className={`fixed top-0 w-full bg-white w-full bottom-0 z-50 duration-200 ease-out ${
        isNavbarOpen ? "left-0" : "left-full"
      }`}
      aria-hidden={`${!isNavbarOpen}`}
    >
      <header className="p-4 border-b flex">
        <Link to="/" className="mt-[0.2rem]">
          <h3 className="font-semibold text-xl">Mad Lib Generator</h3>
        </Link>
        <button
          className="ml-auto p-2 h-8 w-8 rounded  hover:bg-neutral-100 active:bg-neutral-200 ease-out duration-200 flex justify-center items-center"
          onClick={closeNavbar}
        >
          <i className="fa-solid fa-x" onClick={closeNavbar}></i>
        </button>
      </header>
      <ul>
        <li>
          <Link
            to="/"
            className="p-4 block border-b hover:bg-neutral-100 ease-out duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/browse"
            className="p-4 block border-b hover:bg-neutral-100 ease-out duration-200"
          >
            Browse
          </Link>
        </li>
        <li>
          <Link
            to="/saves"
            className="p-4 block border-b hover:bg-neutral-100 ease-out duration-200"
          >
            Saves
          </Link>
        </li>
        <li>
          <Link
            to="/play"
            className="p-4 block border-b hover:bg-neutral-100 ease-out duration-200"
          >
            Multiplayer
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarCanvas;
