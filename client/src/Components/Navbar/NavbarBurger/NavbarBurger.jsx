import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavbarBurger = ({ toggleNav }) => {
  return (
    <button
      className="md:hidden p-2 h-8 w-8 rounded  hover:bg-neutral-100 active:bg-neutral-200 ease-out duration-200 flex justify-center items-center"
      onClick={toggleNav}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default NavbarBurger;
