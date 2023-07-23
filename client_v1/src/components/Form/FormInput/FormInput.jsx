const FormInput = ({
  state,
  onChange,
  className = "",
  padding = "p-2",
  id = "",
  name = "",
  placeholder,
  type = "text",
}) => {
  return (
    <input
      value={state}
      onChange={onChange}
      id={id}
      name={name}
      placeholder={placeholder}
      className={`${padding} border-zinc-600 border p-3 pr-28 rounded bg-inherit w-full  focus:outline outline-2 outline-offset-2 outline-white placeholder:text-zinc-500${
        className && " " + className
      }`}
      type={type}
    />
  );
};

export default FormInput;
