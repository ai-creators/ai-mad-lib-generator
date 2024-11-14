import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export type LandingLayoutProps = {
  children?: ReactNode;
  className?: string;
  isAuthenticated?: boolean;
};

const LandingLayout = ({ children, className }: LandingLayoutProps) => {
  return (
    <>
      <div
        className={cn("flex flex-col min-h-screen bg-background", className)}
      >
        <header>
          <Navbar />
        </header>
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};
export default LandingLayout;
