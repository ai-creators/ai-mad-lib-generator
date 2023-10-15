import Button from "../Button";

const ButtonClear = ({
  link = "",
  onClick,
  children,
  className = "",
  role = "button",
  width = "min-w-[4rem]",
  padding,
  id,
}) => {
  return (
    <Button
      link={link}
      onClick={onClick}
      role={role}
      padding={padding}
      className={`bg-inherit ${width} rounded hover:outline-2 duration-200 ease-out focus:outline outline-2 outline-offset-2 outline-white ${
        className && " " + className
      }`}
      id={id}
    >
      {children}
    </Button>
  );
};

export default ButtonClear;
