import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Footer from "../footer/footer";
import LandingNavbar from "../landing-navbar/landing-navbar";

export type LandingLayoutProps = {
  children?: ReactNode;
  className?: string;
};

const LandingLayout = ({ children, className }: LandingLayoutProps) => {
  return (
    <>
      <div
        className={cn("flex flex-col min-h-screen bg-background", className)}
      >
        <header>
          <LandingNavbar />
        </header>
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};
export default LandingLayout;
