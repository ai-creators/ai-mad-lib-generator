import FooterOld from "../components/Footer/FooterOld/FooterOld";
import Navbar from "../components/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white">{children}</main>
      <FooterOld />
    </>
  );
};

export default Layout;
