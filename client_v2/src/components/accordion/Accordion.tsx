import { ReactNode } from "react";
import ButtonLight from "../button/button-light/ButtonLight";
import { useAccordion } from "./Accordion.hooks";

type Props = {
  children?: ReactNode;
  header: string;
};

const Accordion = ({ children, header }: Props) => {
  const { isOpen, toggleOpen } = useAccordion();
  return (
    <div className="border-b border-zinc-300">
      <div className="flex py-2">
        <p className="font-semibold">{header}</p>
        <ButtonLight
          className="ml-auto flex justify-center items-center"
          hideUnerline
          size="w-8 h-8"
          onClick={toggleOpen}
        >
          <i
            className={`fa-solid fa-chevron-down fa-sm duration-200 ease-out ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        </ButtonLight>
      </div>
      <div
        className={`accordion-content ${
          isOpen ? "h-full" : "hidden h-0"
        } duration-200 ease-out py-3`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
