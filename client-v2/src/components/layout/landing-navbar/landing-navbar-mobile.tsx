import { Logo } from "@/components/logo/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavbarSearch from "@/features/search/navbar-search/navbar-search";
import { Menu } from "lucide-react";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "../navbar/navbar";

const LandingNavbarMobile = () => {
  const links = [
    navLinks.dashboard,
    navLinks.create,
    navLinks.browse,
    navLinks.tags,
    navLinks.saves,
    navLinks.settings,
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="px-0 pt-0">
        <SheetHeader className="mb-5 px-3 py-3 border-b">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-5">
          <li className="border-b px-3">
            <h4 className="text-lg font-semibold tracking-tight mb-2">
              Join the AiAdlibs Community
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Have the ability to hide, save, and delete adlibs, and customize
              the adlibs.
            </p>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "block text-center mb-2"
              )}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "block text-center mb-3"
              )}
            >
              Signup
            </Link>
          </li>
          <li className="px-3">
            <NavbarSearch />
          </li>
          <li>
            <ul className="px-2 flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full text-start justify-start"
                    )}
                  >
                    {link.icon ? (
                      <span className="mr-1">{link.icon}</span>
                    ) : null}
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default LandingNavbarMobile;
