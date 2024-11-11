import { cn } from "@/lib/utils";
import nextLogo from "./next.svg";
import Image from "next/image";

export type LogoProps = {
  imgClassName?: string;
  className?: string;
  height: number;
  width: number;
};

export const Logo = ({ imgClassName, className, width, height }: LogoProps) => {
  return (
    <span className={cn("flex items-center", className)}>
      {/* <Image
        src={nextLogo}
        alt="Ai Adlib Logo"
        className={cn("h-8 mr-2", imgClassName)}
        height={height}
        width={width}
      /> */}
      <h1 className="text-xl font-semibold">Algowars</h1>
    </span>
  );
};
