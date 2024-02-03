import { FormEvent, useState } from "react";

export const useAccordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = (event: FormEvent) => {
    event.preventDefault();
    setIsOpen((curr) => !curr);
  };

  return { isOpen, toggleOpen };
};
