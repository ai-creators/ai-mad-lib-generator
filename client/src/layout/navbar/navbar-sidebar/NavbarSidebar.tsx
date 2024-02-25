import {
  Gamepad2,
  Heart,
  Home,
  PlusSquare,
  Search,
  Settings,
  Tags,
} from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  links?: { url: string; icon?: ReactNode; text: string }[];
};

const NavbarSidebar = ({
  links = [
    {
      url: "/",
      icon: <i className="text-lg">🏠</i>,
      text: "Home",
    },
    {
      url: "/create",
      icon: <i className="text-lg">➕</i>,
      text: "Create",
    },
    {
      url: "/evil-adlibs",
      icon: <i className="text-lg">😈</i>,
      text: "Evil Adlibs",
    },
    {
      url: "/browse",
      icon: <Search />,
      text: "Browse",
    },
    {
      url: "/categories",
      icon: <i className="text-lg">🏷️</i>,
      text: "Tags",
    },
    {
      url: "/saves",
      icon: <i className="text-lg">💖</i>,
      text: "Saves",
    },
    {
      url: "/settings",
      icon: <Settings />,
      text: "Settings",
    },
  ],
}: Props) => {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.url}>
          <Link
            to={link.url}
            className={`h-10 px-4 py-2 gap-3 w-full inline-flex items-center justify-start hover:bg-accent hover:text-accent-foreground whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            )}`}
          >
            {link?.icon ? link.icon : null}
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarSidebar;
