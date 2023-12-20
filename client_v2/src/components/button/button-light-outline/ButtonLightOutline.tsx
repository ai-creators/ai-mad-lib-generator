import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  width?: string;
};

const ButtonLightOutline = ({
  children,
  className = "px-3 py-2",
  href,
  onClick,
  width = "",
}: Props) => {
  if (href) {
    return (
      <Link
        to={href}
        className={`${className} ${width} text-indigo-700 border hover:underline underline-offset-2 border-indigo-700 hover:bg-indigo-700 active:bg-indigo-200 hover:text-white duration-200 ease-out py-2 px-4 rounded`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${className} ${width} text-indigo-700 border border-indigo-700 hover:bg-indigo-700 hover:underline underline-offset-2  hover:text-white active:bg-indigo-200 duration-200 ease-out py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonLightOutline;
