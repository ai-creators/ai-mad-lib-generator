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
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <span className="h-8 w-8 flex justify-center items-center p-0 text-background rounded bg-yellow-500 dark:bg-yellow-500">
          AI
        </span>{" "}
        Adlibs
      </h1>
    </span>
  );
};
