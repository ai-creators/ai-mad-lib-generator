import { Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { navLinks } from "./navbar";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export default function NavbarMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <SheetHeader>
          <SheetTitle className="px-6 text-left">AI Adlibs</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-3 px-2 py-5">
          {navLinks.map((navLink) => (
            <li key={navLink.name}>
              <Link
                href={navLink.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "items flex w-full items-center justify-start gap-3 capitalize",
                )}
              >
                <navLink.icon />
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
