import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  width?: string;
};

const ButtonLight = ({
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
        className={`${className} ${width} text-black hover:text-indigo-800 hover:underline underline-offset-2 hover:bg-indigo-100 active:bg-indigo-200 duration-200 ease-out py-2 px-4 rounded`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${className} ${width} text-black hover:text-indigo-800 hover:bg-indigo-100 hover:underline underline-offset-2 active:bg-indigo-200 duration-200 ease-out py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default ButtonLight;
