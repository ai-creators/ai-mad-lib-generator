import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useAppSelector } from "../hooks/useAppSelector";

type Props = {
  children?: React.ReactNode;
  bgColor?: string;
  mainClassName?: string;
};

const Layout = ({
  children,
  bgColor = "bg-zinc-100 text-black ",
  mainClassName = "",
}: Props) => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <header className={bgColor}>
        <Navbar />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
