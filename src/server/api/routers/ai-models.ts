import { llmBrands, llmModels } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
    eq,
  } from "drizzle-orm/expressions";

export const aiModelsRouter = createTRPCRouter({
    getModels: publicProcedure.query(async ({ ctx }) => {
        const rows = await ctx.db
          .select({
            brandId: llmBrands.id,
            brandName: llmBrands.name,
            modelId: llmModels.id,
            modelName: llmModels.name,
          })
          .from(llmBrands)
          .leftJoin(llmModels, eq(llmModels.brandId, llmBrands.id))
          .where(eq(llmModels.isAvailable, true))

        const brands = rows.reduce((acc, { brandId, brandName, modelId, modelName }) => {
          let brand = acc.find(b => b.id === brandId);
          if (!brand) {
            brand = { id: brandId, name: brandName, models: [] };
            acc.push(brand);
          }
          if (modelId && modelName) {
            brand.models.push({ id: modelId, name: modelName });
          }
          return acc;
        }, [] as {
          id: string;
          name: string;
          models: { id: string; name: string }[];
        }[]);
    
        return brands;
      }),
});
