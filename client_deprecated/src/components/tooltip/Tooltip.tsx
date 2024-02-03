import { useTooltip } from "./Tooltip.hooks";

type Props = {
  id: string;
  text: string;
  width?: string;
  margin?: string;
};

const Tooltip = ({ id, text, width = "w-48", margin = "mt-1" }: Props) => {
  const { isVisible, showTooltip, hideTooltip, toggleTooltip } = useTooltip();

  return (
    <div className="relative">
      <button
        data-tooltip-target={id}
        type="button"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={toggleTooltip}
        className={`${margin} text-white bg-zinc-400 text-xs hover:bg-zinc-500 active:bg-zinc-600 focus:ring-2 focus:outline-none duration-200 ease-out focus:ring-zinc-300 font-medium rounded-full text-sm w-4 h-4 flex justify-center items-center text-center`}
      >
        i
      </button>
      <div
        role="tooltip"
        id={id}
        className={`${width} absolute z-10 bottom-[150%] inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-indigo-900 rounded-lg shadow-sm tooltip ${
          isVisible ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {text}
        <div
          className="tooltip-arrow absolute top-full left-1/2"
          data-popper-arrow
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
