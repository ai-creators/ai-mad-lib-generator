import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const Layout = ({ children, className, hero = null }) => {
  return (
    <>
      <header>
        <Navbar />
        {hero}
      </header>
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  classname: "",
};

export default Layout;
