import React from "react";
import Container from "../containers/container";
import Link from "next/link";
import { routerConfig } from "~/app/router-config";
import { DarkModeButton } from "~/app/_features/theme/dark-mode-button";
import { buttonVariants } from "~/components/ui/button";
import NavbarMenu from "./navbar-menu";
import { Home, Search, SquarePlus } from "lucide-react";
import NavbarSearch from "./navbar-search";

export const navLinks = [
  {
    name: "home",
    href: routerConfig.root.path,
    icon: Home,
  },
  {
    name: "Create",
    href: routerConfig.create.path,
    icon: SquarePlus,
  },
  {
    name: "Browse",
    href: routerConfig.browse.path,
    icon: Search,
  },
];

export default function Navbar() {
  return (
    <nav className="border-b py-3">
      <Container className="flex items-center justify-between px-4">
        <ul className="flex items-center gap-5">
          <li className="md:hidden">
            <NavbarMenu />
          </li>
          <li>
            <Link
              href={routerConfig.root.path}
              className="font-semibold uppercase"
            >
              AI Adlibs
            </Link>
          </li>
          <li>
            <NavbarSearch />
          </li>
        </ul>
        <ul className="flex items-center gap-5">
          <li>
            <Link
              href={routerConfig.create.path}
              className={buttonVariants({ variant: "default" })}
            >
              Create Adlib
            </Link>
          </li>
          <li>
            <DarkModeButton />
          </li>
        </ul>
      </Container>
    </nav>
  );
}
