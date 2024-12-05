"use client";

import { navLinks } from "@/components/layout/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const NavbarSearch = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (search.trim()) {
      router.push(`${navLinks.browse.href}?q=${encodeURIComponent(search)}`);
    } else if (search.trim().length === 0) {
      setSearch("");
    }
  };

  return (
    <form className="relative w-full" onSubmit={onSubmit}>
      <Input
        id="search"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-l-none"
        variant="ghost"
        type="submit"
      >
        <Search />
      </Button>
    </form>
  );
};

export default NavbarSearch;
