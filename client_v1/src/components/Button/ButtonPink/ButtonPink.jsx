import Button from "../Button";

const ButtonPink = ({
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
      className={`bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white rounded ${width} duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-pink-600${
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

export default ButtonPink;
