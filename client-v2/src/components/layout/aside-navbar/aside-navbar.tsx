import React from "react";
import { navLinks } from "../navbar/navbar";
import Link from "next/link";

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
    <ul className="flex flex-col gap-5">
      {links.map((link) => (
        <li key={link.title}>
          <Link href={link.href} className="flex items-center">
            {link.icon ? <span className="mr-4">{link.icon}</span> : null}
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AsideNavbar;
