"use client";

import React from "react";
import { NavbarUserButton } from "./navbar-user-button";
import { useUser } from "@clerk/nextjs";

export default function NavbarAuth() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return <NavbarUserButton />;
}
