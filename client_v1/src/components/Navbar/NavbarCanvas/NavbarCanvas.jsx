import { Link } from "react-router-dom";

const NavbarCanvas = ({ isOpen, setIsOpen }) => {
  const closeCanvas = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={`${isOpen ? "" : "hidden"} md:hidden navbar-canvas-backdrop`}
      ></div>
      <div
        className={`${
          isOpen ? "right-0" : "left-full"
        } z-50 fixed top-0 bottom-0 duration-200 md:hidden ease-out bg-zinc-950 w-11/12 sm:w-3/5 lg:w-3/12 border-l border-l-zinc-600`}
      >
        <div className="border-b border-zinc-600 p-3 flex justify-between items-center">
          <Link to="/" className="py-3">
            <h1 className="text-lg font-semibold">Ai Ad-Libs</h1>
          </Link>
          <button
            className="w-10 h-10 rounded ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
            onClick={closeCanvas}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul>
          <li>
            <Link
              to="/"
              className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800 "
              onClick={closeCanvas}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/libs"
              className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
              onClick={closeCanvas}
            >
              Create
            </Link>
          </li>
          <li>
            <Link
              to="/libs/browse"
              className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
              onClick={closeCanvas}
            >
              Browse
            </Link>
          </li>
          <li>
            <Link
              to="/saves"
              className="p-5 block ease-out duration-200 hover:bg-zinc-900 active:bg-zinc-800"
              onClick={closeCanvas}
            >
              Saves
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarCanvas;
