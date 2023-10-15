import FormInput from "../FormInput/FormInput";

const FormItem = ({
  label,
  state,
  onChange,
  id = "",
  type,
  name = "",
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id}>{label}</label>
      <FormInput
        state={state}
        onChange={onChange}
        id={id}
        name={name}
        type={type}
        className={className}
      />
    </div>
  );
};

export default FormItem;
