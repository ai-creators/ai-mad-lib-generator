import { z } from 'zod';
import { createTRPCRouter,  publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';
import { contentReaction } from '~/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';

export const reactionsRouter = createTRPCRouter({
  set: publicProcedure
    .input(z.object({ contentId: z.string(), reaction: z.enum(['like', 'dislike']) }))
    .mutation(async ({ ctx, input }) => {
      const existing = await db.query.contentReaction.findFirst({
        where: and(
          eq(contentReaction.userId, ctx.session.user.id),
          eq(contentReaction.contentId, input.contentId),
        ),
      });

      if (existing) {
        await db
          .update(contentReaction)
          .set({ reaction: input.reaction })
          .where(eq(contentReaction.id, existing.id));
      } else {
        await db.insert(contentReaction).values({
          userId: ctx.session.user.id,
          contentId: input.contentId,
          reaction: input.reaction,
        });
      }
    }),

  remove: publicProcedure
    .input(z.object({ contentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.delete(contentReaction).where(
        and(
          eq(contentReaction.userId, ctx.session.user.id),
          eq(contentReaction.contentId, input.contentId),
        )
      );
    }),

  counts: publicProcedure
    .input(z.object({ contentId: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select({
          likeCount: sql<number>`count(*) FILTER (WHERE ${contentReaction.reaction} = 'like')`,
          dislikeCount: sql<number>`count(*) FILTER (WHERE ${contentReaction.reaction} = 'dislike')`,
        })
        .from(contentReaction)
        .where(eq(contentReaction.contentId, input.contentId));

      return result[0] ?? { likeCount: 0, dislikeCount: 0 };
    }),
});
