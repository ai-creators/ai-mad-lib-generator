import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
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

export default Layout;
