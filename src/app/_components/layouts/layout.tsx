import React, { type ReactNode } from "react";
import Footer from "../footers/footer";
import Navbar from "../navbars/navbar";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
