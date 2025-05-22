import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibTones } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const toneRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(adlibTones)
      .where(eq(adlibTones.available, true))
      .orderBy(desc(adlibTones.createdAt));
  }),
});
