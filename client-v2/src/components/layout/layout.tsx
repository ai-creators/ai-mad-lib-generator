import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
  mainClassName?: string;
};

const Layout = ({ children, className, mainClassName }: LayoutProps) => {
  return (
    <>
      <div
        className={cn("flex flex-col min-h-screen bg-background", className)}
      >
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className={cn("grow", mainClassName)}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
