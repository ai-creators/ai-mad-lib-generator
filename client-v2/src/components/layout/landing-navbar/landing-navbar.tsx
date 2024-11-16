import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import Link from "next/link";
import React from "react";
import { navLinks } from "../navbar/navbar";
import { Container } from "@/components/container/container";
import LandingNavbarMobile from "./landing-navbar-mobile";

const LandingNavbar = () => {
  const links = [
    navLinks.dashboard,
    navLinks.create,
    navLinks.browse,
    navLinks.tags,
  ];
  return (
    <nav className="fixed top-0 w-full border-b shadow-sm z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="grid grid-cols-3 py-3 px-3 xl:px-0">
        <ul className="flex justify-start items-center gap-5">
          <li className="lg:hidden flex justify-center items-center">
            <LandingNavbarMobile />
          </li>
          <li>
            <Link href="/">
              <Logo width={20} height={20} />
            </Link>
          </li>
        </ul>
        <div className="flex justify-center items-center gap-4">
          <ul className="hidden lg:flex justify-center items-center gap-4">
            {links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex justify-end items-center gap-5">
          <li>
            <ThemeToggle className="border-none" />
          </li>
          <li className="hidden md:block">
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

export default LandingNavbar;
