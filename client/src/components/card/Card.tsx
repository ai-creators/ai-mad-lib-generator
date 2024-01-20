import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  padding?: string;
  borderColor?: string;
  border?: string;
  borderRadius?: string;
  className?: string;
};

const Card = ({ children }: Props) => {
  return <article>{children}</article>;
};

export default Card;
