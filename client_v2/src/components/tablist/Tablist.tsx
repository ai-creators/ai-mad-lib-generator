import { FormEvent } from "react";

type Props<T> = {
  options: T[];
  className?: string;
  currentOption: T;
  changeOption: (option: T) => void;
};

const Tablist = <T extends string>({
  options,
  currentOption,
  className,
  changeOption,
}: Props<T>) => {
  return (
    <ul className={`bg-zinc-200 flex gap-2 w-fit p-1 rounded-md ${className}`}>
      {options.map((option) => (
        <li key={option}>
          <button
            className={`p-1.5 rounded-md w-20 text-sm font-semibold ${
              currentOption === option ? "bg-white text-black" : "text-zinc-500"
            }`}
            onClick={(event: FormEvent) => {
              event.preventDefault();
              changeOption(option);
            }}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tablist;
