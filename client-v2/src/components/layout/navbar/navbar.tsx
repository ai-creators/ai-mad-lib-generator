import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import NavbarSearch from "@/features/search/navbar-search/navbar-search";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPen,
  faMagnifyingGlass,
  faTags,
  faHeart,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Container } from "@/components/container/container";
import NavbarMobile from "./navbar-mobile";

export interface NavLink {
  href: string;
  title: string;
  icon?: ReactNode;
}

export const navLinks: Record<string, NavLink> = {
  landing: {
    href: "/",
    title: "Landing Page",
  },
  dashboard: {
    href: "/dashboard",
    title: "Home",
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  create: {
    href: "/create",
    title: "Create",
    icon: <FontAwesomeIcon icon={faPen} />,
  },
  browse: {
    href: "/browse",
    title: "Browse",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  },
  tags: {
    href: "/tags",
    title: "Tags",
    icon: <FontAwesomeIcon icon={faTags} />,
  },
  saves: {
    href: "/saves",
    title: "Saves",
    icon: <FontAwesomeIcon icon={faHeart} />,
  },
  settings: {
    href: "/settings",
    title: "Settings",
    icon: <FontAwesomeIcon icon={faGear} />,
  },
};

const Navbar = () => {
  return (
    <nav className="border-b shadow-sm z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="grid grid-cols-3 py-3 px-3 xl:px-0">
        <ul className="flex justify-start items-center gap-5">
          <li className="lg:hidden flex justify-center items-center">
            <NavbarMobile />
          </li>
          <li>
            <Link href="/">
              <Logo width={20} height={20} />
            </Link>
          </li>
          <li className="hidden lg:block w-80">
            <NavbarSearch />
          </li>
        </ul>
        <ul></ul>

        <ul className="flex justify-end items-center gap-5">
          <li>
            <ThemeToggle className="border-none" />
          </li>
          <li className="hidden lg:block">
            <Link
              href="/login"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Login
            </Link>
          </li>
          <li>
            <Button>Create Adlib</Button>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
