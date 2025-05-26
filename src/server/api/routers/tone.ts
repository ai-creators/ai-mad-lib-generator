import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibTones } from "~/server/db/schema";
import { eq, desc, and, isNull } from "drizzle-orm";

export const toneRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(adlibTones)
      .where(and(eq(adlibTones.available, true), isNull(adlibTones.deletedAt)))
      .orderBy(desc(adlibTones.createdAt));
  }),
});
