import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibComments } from "~/server/db/schema";
import { and, eq, desc, isNull } from "drizzle-orm";

export const commentsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        adlibId: z.string(),
        body: z.string().trim().min(1).max(1000),
        authorName: z.string().trim().max(50).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [comment] = await ctx.db
        .insert(adlibComments)
        .values({
          adlibId: input.adlibId,
          body: input.body,
          authorName: input.authorName ?? null,
        })
        .returning({ id: adlibComments.id });

      if (!comment) {
        throw new Error("Failed to create comment");
      }

      return comment.id;
    }),

  getByAdlibId: publicProcedure
    .input(z.object({ adlibId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.adlibComments.findMany({
        where: and(
          eq(adlibComments.adlibId, input.adlibId),
          eq(adlibComments.isHidden, false),
          isNull(adlibComments.deletedAt),
        ),
        orderBy: desc(adlibComments.createdAt),
      });
    }),
});
