import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const LayoutLanding = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutLanding;
