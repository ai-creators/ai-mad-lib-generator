import React from "react";
import { navLinks } from "../navbar/navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AsideNavbar = () => {
  const links = [
    navLinks.dashboard,
    navLinks.create,
    navLinks.browse,
    navLinks.tags,
    navLinks.saves,
    navLinks.settings,
  ];
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.title}>
          <Link
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center text-left justify-start"
            )}
          >
            {link.icon ? <span className="mr-4">{link.icon}</span> : null}
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AsideNavbar;
