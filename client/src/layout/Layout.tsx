import { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
};

const Layout = ({
  children,
  bgColor = "bg-zinc-900 text-white",
  mainClassName = "",
}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className={bgColor}>
        <Navbar />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
