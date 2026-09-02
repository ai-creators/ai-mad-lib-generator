import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibReactions } from "~/server/db/schema";
import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { ReactionType } from "~/types/reactions";

export const reactionsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        adlibId: z.string(),
        reactionType: z.nativeEnum(ReactionType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [reaction] = await ctx.db
        .insert(adlibReactions)
        .values({
          adlibId: input.adlibId,
          reactionType: input.reactionType,
        })
        .returning({ id: adlibReactions.id });

      return reaction?.id;
    }),

  getCounts: publicProcedure
    .input(z.object({ adlibId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          reactionType: adlibReactions.reactionType,
          count: sql<number>`count(*)`,
        })
        .from(adlibReactions)
        .where(
          and(
            eq(adlibReactions.adlibId, input.adlibId),
            isNull(adlibReactions.deletedAt),
          ),
        )
        .groupBy(adlibReactions.reactionType);
    }),

  getCountsBatch: publicProcedure
    .input(z.object({ adlibIds: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      if (input.adlibIds.length === 0) return [];

      return await ctx.db
        .select({
          adlibId: adlibReactions.adlibId,
          reactionType: adlibReactions.reactionType,
          count: sql<number>`count(*)`,
        })
        .from(adlibReactions)
        .where(
          and(
            inArray(adlibReactions.adlibId, input.adlibIds),
            isNull(adlibReactions.deletedAt),
          ),
        )
        .groupBy(adlibReactions.adlibId, adlibReactions.reactionType);
    }),
});
