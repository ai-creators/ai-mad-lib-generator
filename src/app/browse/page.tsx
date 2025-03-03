import { HydrateClient } from "~/trpc/server";
import Browse from "../_features/browse/browse";

export default async function BrowsePage() {
  return (
    <HydrateClient>
      <Browse />
    </HydrateClient>
  );
}
