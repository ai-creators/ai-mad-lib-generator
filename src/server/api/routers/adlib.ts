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

import { SQL, sql } from "drizzle-orm";
import { eq, lt, asc, desc, or, like, and } from "drizzle-orm/expressions";
import { FeedTypeOption } from "~/types/adlib";

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
        feedType: z.nativeEnum(FeedTypeOption).default(FeedTypeOption.LATEST),
        search: z.string().optional(),
        contentRating: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, size, timestamp, feedType, search, contentRating } = input;
      const dateFilter = new Date(timestamp);
      const searchTerm = search?.trim() ?? "";

      // Build the base condition and orderBy based on feedType.
      let baseCondition;
      let orderByCondition;
      if (feedType === FeedTypeOption.FEATURED) {
        baseCondition = eq(adlibs.isFeatured, true);
        orderByCondition = desc(adlibs.createdAt);
      } else {
        baseCondition = lt(adlibs.createdAt, dateFilter);
        orderByCondition =
          feedType === FeedTypeOption.OLDEST
            ? asc(adlibs.createdAt)
            : desc(adlibs.createdAt);
      }

      // Add content rating condition if needed.
      let contentCondition = undefined;
      if (contentRating === "pg") {
        contentCondition = eq(adlibs.isPg, true);
      }

      // Create fuzzy search condition if a search term is provided.
      const searchCondition = searchTerm
        ? or(
            like(adlibs.title, `%${searchTerm}%`),
            like(adlibs.prompt, `%${searchTerm}%`),
          )
        : undefined;

      // Combine all conditions together.
      let whereCondition: SQL<unknown> = baseCondition;
      if (contentCondition !== undefined) {
        whereCondition = and(whereCondition, contentCondition)!;
      }
      if (searchCondition !== undefined) {
        whereCondition = and(whereCondition, searchCondition)!;
      }
      // Query paginated records.
      const results = await ctx.db.query.adlibs.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        limit: size,
        offset: (page - 1) * size,
      });

      // Count total records matching the condition.
      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(adlibs)
        .where(whereCondition);
      const totalCount = countResult[0]?.count ?? 0;
      const totalPages = Math.ceil(totalCount / size);

      // Map results to return only id, prompt, title, and createdAt.
      const mappedResults = results.map(
        (adlib: {
          id: string;
          prompt: string;
          title: string;
          createdAt: Date;
        }) => ({
          id: adlib.id,
          prompt: adlib.prompt,
          title: adlib.title,
          createdAt: adlib.createdAt,
        }),
      );

      return {
        results: mappedResults,
        page,
        size,
        totalPages,
      };
    }),
});
