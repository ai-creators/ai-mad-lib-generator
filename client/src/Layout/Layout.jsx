import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const Layout = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  classname: "",
};

export default Layout;
