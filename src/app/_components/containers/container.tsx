import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  className?: string;
  children?: ReactNode;
};

function Container({ className, children }: Props) {
  return <div className={cn("mx-auto max-w-6xl", className)}>{children}</div>;
}

export default Container;
