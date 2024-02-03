import { ReactNode } from "react";
import Card from "../../card/Card";

type Props = {
  children?: ReactNode;
  className?: string;
};

const ToastInformation = ({ children, className = "" }: Props) => {
  return (
    <Card
      className={`bg-white drop-shadow z-50 fixed top-5 left-1/2 -translate-x-1/2${
        className && " " + className
      }`}
    >
      {children}
    </Card>
  );
};

export default ToastInformation;
