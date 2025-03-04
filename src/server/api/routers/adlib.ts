/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibs } from "../../db/schema";
import { createMadlib } from "../lib/openai";

export enum FeedTypeOption {
  Latest = "latest",
  Featured = "featured",
  Oldest = "oldest",
}

export const adlibRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        temperature: z.number().min(0).max(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const madlibResponse = await createMadlib(input.prompt, {
        temperature: input.temperature,
      });

      const result = await ctx.db
        .insert(adlibs)
        .values({
          title: madlibResponse.title,
          prompt: input.prompt,
          text: madlibResponse.madlib,
          isPg: madlibResponse.isPg,
          temperature: input.temperature.toString(),
        })
        .returning();

      return result[0]?.id;
    }),
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
      console.log("INPUT: ", input);
      const { page, size, timestamp, feedType } = input;
      const dateFilter = new Date(timestamp);

      const results = await ctx.db.query.adlibs.findMany({
        where: (adlib, { gt }) => gt(adlib.createdAt, dateFilter),
        orderBy: (adlib, { asc }) => asc(adlib.createdAt),
        limit: size,
        offset: (page - 1) * size,
      });

      console.log("RESULTS: ", results);

      return results;
    }),
});
