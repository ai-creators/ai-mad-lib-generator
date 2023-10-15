import Button from "../Button";

const ButtonYellow = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
  id,
  type,
  padding = "",
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      className={`bg-yellow-400 text-black hover:bg-yellow-600 active:bg-yellow-700 text-white rounded ${width} duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-yellow-600${
        className && " " + className
      }`}
      id={id}
      type={type}
      padding={padding}
    >
      {children}
    </Button>
  );
};

export default ButtonYellow;
