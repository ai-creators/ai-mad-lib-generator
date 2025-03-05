import React from "react";
import { Card } from "~/components/ui/card";
import { navLinks } from "./navbar";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

type Props = {
  className?: string;
};

function AsideNavbar({ className }: Props) {
  return (
    <Card className={cn("", className)}>
      <ul className="flex flex-col gap-2 p-2">
        {navLinks.map((navLink) => (
          <li key={navLink.name}>
            <Link
              href={navLink.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "items flex w-full items-center justify-start gap-3 capitalize",
              )}
              prefetch={true}
            >
              <navLink.icon />
              {navLink.name}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default AsideNavbar;
