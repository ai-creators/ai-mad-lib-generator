import React from "react";
import { HydrateClient } from "~/trpc/server";
import Saves from "../_features/saves/saves";

export default function SavesPage() {
  return (
    <HydrateClient>
      <Saves />
    </HydrateClient>
  );
}
