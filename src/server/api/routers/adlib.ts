/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { adlibs, categories, madlibCategories } from "../../db/schema";
import { createMadlib } from "../lib/openai";

import { count, type SQL, sql } from "drizzle-orm";
import {
  eq,
  lt,
  asc,
  desc,
  or,
  like,
  and,
  inArray,
} from "drizzle-orm/expressions";
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

      const lowerCaseCategories = madlibResponse?.categories.map((cat) =>
        cat.toLowerCase(),
      );
      // Upsert categories and store their IDs
      const categoryIds: string[] = [];
      for (const category of lowerCaseCategories) {
        const [categoryResult] = await ctx.db
          .insert(categories)
          .values({ name: category })
          .onConflictDoNothing()
          .returning({ id: categories.id });

        const categoryId =
          categoryResult?.id ??
          (
            await ctx.db
              .select({ id: categories.id })
              .from(categories)
              .where(eq(categories.name, category))
              .limit(1)
          )[0]?.id;

        if (categoryId) {
          categoryIds.push(categoryId);
        }
      }

      // Insert madlib entry
      const [madlib] = await ctx.db
        .insert(adlibs)
        .values({
          title: madlibResponse.title,
          prompt: input.prompt,
          text: madlibResponse.madlib,
          isPg: madlibResponse.isPg,
          temperature: input.temperature.toString(),
        })
        .returning({ id: adlibs.id });

      if (!madlib) {
        throw new Error("Failed to insert madlib");
      }

      // Insert into madlib_categories to establish the many-to-many relation
      for (const categoryId of categoryIds) {
        await ctx.db
          .insert(madlibCategories)
          .values({ madlibId: madlib.id, categoryId })
          .onConflictDoNothing(); // Avoid duplicate entries
      }

      return madlib.id;
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

      let contentCondition = undefined;
      if (contentRating === "pg") {
        contentCondition = eq(adlibs.isPg, true);
      }

      const searchCondition = searchTerm
        ? or(
            like(adlibs.title, `%${searchTerm}%`),
            like(adlibs.prompt, `%${searchTerm}%`),
          )
        : undefined;

      let whereCondition: SQL<unknown> = baseCondition;
      if (contentCondition !== undefined) {
        whereCondition = and(whereCondition, contentCondition)!;
      }
      if (searchCondition !== undefined) {
        whereCondition = and(whereCondition, searchCondition)!;
      }

      const results = await ctx.db.query.adlibs.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        limit: size,
        offset: (page - 1) * size,
      });

      const adlibIds = results.map((adlib) => adlib.id);
      const categoryMappings = await ctx.db
        .select({
          madlibId: madlibCategories.madlibId,
          categoryName: categories.name,
        })
        .from(madlibCategories)
        .innerJoin(categories, eq(madlibCategories.categoryId, categories.id))
        .where(inArray(madlibCategories.madlibId, adlibIds));

      const categoriesMap = categoryMappings.reduce(
        (acc, { madlibId, categoryName }) => {
          if (!acc[madlibId]) acc[madlibId] = [];
          acc[madlibId].push(categoryName ?? "");
          return acc;
        },
        {} as Record<string, string[]>,
      );

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
          categories: categoriesMap[adlib.id] ?? [],
        }),
      );

      const countResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(adlibs)
        .where(whereCondition);
      const totalCount = countResult[0]?.count ?? 0;
      const totalPages = Math.ceil(totalCount / size);

      return {
        results: mappedResults,
        page,
        size,
        totalPages,
      };
    }),

  getFeaturedAdlibs: publicProcedure
    .input(
      z.object({
        isPg: z.boolean(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(adlibs.isFeatured, true)];

      if (input.isPg) {
        conditions.push(eq(adlibs.isPg, true));
      }

      const featuredAdlibs = await ctx.db.query.adlibs.findMany({
        where: and(...conditions),
        orderBy: desc(adlibs.createdAt),
        limit: 10,
      });

      const adlibIds = featuredAdlibs.map((adlib) => adlib.id);

      if (adlibIds.length === 0) {
        return [];
      }

      const categoryMappings = await ctx.db
        .select({
          madlibId: madlibCategories.madlibId,
          categoryName: categories.name,
        })
        .from(madlibCategories)
        .innerJoin(categories, eq(madlibCategories.categoryId, categories.id))
        .where(inArray(madlibCategories.madlibId, adlibIds));

      const categoriesMap = categoryMappings.reduce(
        (acc, { madlibId, categoryName }) => {
          if (!acc[madlibId]) acc[madlibId] = [];
          acc[madlibId].push(categoryName ?? "");
          return acc;
        },
        {} as Record<string, string[]>,
      );

      const mappedResults = featuredAdlibs.map((adlib) => ({
        id: adlib.id,
        prompt: adlib.prompt,
        title: adlib.title,
        createdAt: adlib.createdAt,
        categories: categoriesMap[adlib.id] ?? [],
      }));

      return mappedResults;
    }),
  getAdlibById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const adlib = await ctx.db.query.adlibs.findFirst({
        where: eq(adlibs.id, input),
      });

      return {
        id: adlib?.id,
        prompt: adlib?.prompt,
        title: adlib?.title,
        createdAt: adlib?.createdAt,
      };
    }),

  getCategoriesPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        size: z.number().min(1).max(100).default(10),
        timestamp: z.string(),
        feedType: z.nativeEnum(FeedTypeOption).default(FeedTypeOption.LATEST),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, size, timestamp, feedType, search } = input;
      const dateFilter = new Date(timestamp);
      const searchTerm = search?.trim() ?? "";

      const baseCondition = lt(categories.createdAt, dateFilter);
      let orderByCondition = desc(sql`adlibCount`);
      if (feedType === FeedTypeOption.OLDEST) {
        orderByCondition = asc(categories.createdAt);
      } else if (feedType === FeedTypeOption.LATEST) {
        orderByCondition = desc(categories.createdAt);
      }

      const searchCondition: SQL<unknown> | null = searchTerm
        ? like(categories.name, `%${searchTerm}%`)
        : null;

      let whereCondition: SQL<unknown> = baseCondition;
      if (searchCondition) {
        whereCondition = and(whereCondition, searchCondition) ?? baseCondition;
      }

      const categoriesWithCount = await ctx.db
        .select({
          id: categories.id,
          name: categories.name,
          adlibCount: count(madlibCategories.madlibId),
        })
        .from(categories)
        .leftJoin(
          madlibCategories,
          eq(categories.id, madlibCategories.categoryId),
        )
        .where(whereCondition)
        .groupBy(categories.id)
        .orderBy(orderByCondition)
        .limit(size)
        .offset((page - 1) * size);

      const totalCategories = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(categories)
        .where(baseCondition);
      const totalPages = Math.ceil((totalCategories[0]?.count ?? 0) / size);

      return {
        results: categoriesWithCount,
        page,
        size,
        totalPages,
      };
    }),
});
