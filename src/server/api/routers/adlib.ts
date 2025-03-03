/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibs } from "../../db/schema";

export enum FeedTypeOption {
  Latest = "latest",
  Featured = "featured",
  Oldest = "oldest",
}

export const adlibRouter = createTRPCRouter({
  getPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        size: z.number().min(1).max(100).default(10),
        timestamp: z.string(),
        feedType: z.nativeEnum(FeedTypeOption).default(FeedTypeOption.Latest),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, size, timestamp, feedType } = input;
      const dateFilter = new Date(timestamp);

      const results = await ctx.db.query.adlibs.findMany({
        where: (adlib, { gt }) => gt(adlib.createdAt, dateFilter),
        orderBy: (adlib, { asc }) => asc(adlib.createdAt),
        limit: size,
        offset: (page - 1) * size,
      });

      return results;
    }),
});
