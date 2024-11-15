import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import Link from "next/link";
import React from "react";
import { navLinks } from "../navbar/navbar";

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 w-full border-b shadow-sm z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid grid-cols-3 py-3">
        <ul className="flex justify-start items-center">
          <li>
            <Link href="/">
              <Logo width={20} height={20} />
            </Link>
          </li>
        </ul>
        <ul className="flex justify-center items-center gap-4">
          <ul className="flex justify-center items-center gap-4">
            {navLinks.map((link) =>
              link.hidden ? null : (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </ul>

        <ul className="flex justify-end items-center gap-5">
          <li>
            <ThemeToggle className="border-none" />
          </li>
          <li>
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
      </div>
    </nav>
  );
};

export default LandingNavbar;
