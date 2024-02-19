import ThemeToggle from "@/components/button/ThemeToggle";
import LoginButton from "@/components/button/auth/LoginButton";
import SignupButton from "@/components/button/auth/SignupButton";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

const NavbarNotSignedIn = ({ className = "" }: Props) => {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      <li className="hidden">
        <Link to="/search" className={buttonVariants({ variant: "ghost" })}>
          <Search />
        </Link>
      </li>
      <li>
        <LoginButton />
      </li>
      <li>
        <SignupButton />
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default NavbarNotSignedIn;
