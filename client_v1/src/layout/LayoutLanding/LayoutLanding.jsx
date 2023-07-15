import Footer from "../../components/Footer/Footer";
import NavbarLanding from "../../components/Navbar/NavbarLanding/NavbarLanding";

const LayoutLanding = ({ children }) => {
  return (
    <>
      <NavbarLanding />
      <main className="bg-zinc-950 text-white">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutLanding;
