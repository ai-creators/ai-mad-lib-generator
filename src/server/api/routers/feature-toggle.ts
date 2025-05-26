// /src/server/api/routers/featureToggle.ts

import { createTRPCRouter, publicProcedure } from "../trpc";
import { featureToggles } from "~/server/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export const featureToggleRouter = createTRPCRouter({
  getAvailableFeatures: publicProcedure.query(async ({ ctx }) => {
    const features = await ctx.db
      .select()
      .from(featureToggles)
      .where(
        and(
          eq(featureToggles.category, "game_feature"),
          eq(featureToggles.isOn, true),
          isNull(featureToggles.deletedAt),
        ),
      );

    return features;
  }),
});
