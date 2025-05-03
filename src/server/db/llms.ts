// pages/api/llms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "ai-mad-lib-generator\src\server\db.ts";              // <-- your Drizzle+Supabase client
import { llmBrands, llmModels } from "@/db/schema";  // <-- your pgTable defs
import { eq, and, asc } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 1) Fetch all active brands, ordered by sortOrder then name
    const brands = await db
      .select()
      .from(llmBrands)
      .where(eq(llmBrands.isActive, true))
      .orderBy(asc(llmBrands.sortOrder), asc(llmBrands.name));

    // 2) For each brand, fetch its active models
    const result = await Promise.all(
      brands.map(async (b) => {
        const models = await db
          .select()
          .from(llmModels)
          .where(
            and(
              eq(llmModels.brandId, b.id),
              eq(llmModels.isActive, true)
            )
          )
          .orderBy(asc(llmModels.sortOrder), asc(llmModels.name));
        return { brand: b, models };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load LLMs" });
  }
}
