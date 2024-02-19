import ThemeToggle from "@/components/button/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import NavbarAvatar from "../navbar-avatar/NavbarAvatar";

type Props = {
  className?: string;
};

const NavbarSignedIn = ({ className = "" }: Props) => {
  return (
    <ul className={`items-center flex gap-5 ${className}`}>
      <li className="hidden">
        <Button className={buttonVariants({ variant: "ghost" })}>
          <Search />
        </Button>
      </li>
      <li>
        <Link to="/create" className={buttonVariants({ variant: "default" })}>
          Create Adlib
        </Link>
      </li>
      <li>
        <NavbarAvatar />
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
