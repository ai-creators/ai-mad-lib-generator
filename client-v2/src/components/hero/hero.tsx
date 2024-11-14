import React from "react";
import { Spotlight } from "../ui/spotlight";
import { BackgroundLines } from "../ui/background-lines";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const Hero = () => {
  return (
    <div className="h-[40rem] w-full flex md:items-center md:justify-center antialiased relative overflow-hidden">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-foreground-muted bg-gradient-to-b from-foreground to-foreground bg-opacity-50">
            Create Madlibs <br /> using AI.
          </h1>
          <p className="mt-4 font-normal text-base text-muted-foreground max-w-lg text-center mx-auto">
            Build Fun Madlibs using any prompt to have more fun with other
            people. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Mollitia, dolor?
          </p>
          <div className="flex items-center gap-3 justify-center mt-6">
            <Link
              href="/create"
              className={cn(buttonVariants({ variant: "default" }), "w-32")}
            >
              Create Adlib
            </Link>
            <Link
              href="/signup"
              className={cn(buttonVariants({ variant: "outline" }), "w-32")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
};

export default Hero;
