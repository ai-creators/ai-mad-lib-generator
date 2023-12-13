import { Link } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

const ButtonPrimary3D = ({
  children,
  className = "px-3 py-2",
  href,
}: Props) => {
  if (href) {
    return (
      <Link
        to={href}
        className={`${className} bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-800 rounded`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${className} bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-800 hover:border-green-800 rounded`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary3D;
