import { HydrateClient } from "~/trpc/server";
import Settings from "../_features/settings/settings";

export default function SettingsPage() {
  return (
    <HydrateClient>
      <Settings />
    </HydrateClient>
  );
}
