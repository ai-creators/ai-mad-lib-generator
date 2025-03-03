import { HydrateClient } from "~/trpc/server";
import Dashboard from "./_features/dashboard/dashboard";

export default async function Home() {
  return (
    <HydrateClient>
      <Dashboard />
    </HydrateClient>
  );
}
