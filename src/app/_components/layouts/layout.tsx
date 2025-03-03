import React, { type ReactNode } from "react";
import Footer from "../footers/footer";
import Navbar from "../navbars/navbar";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
