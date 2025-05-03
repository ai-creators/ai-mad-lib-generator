// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ai_adlibs_${name}`);

export const adlibs = createTable("adlibs", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  oldId: integer("old_id")
    .unique()
    .default(sql`NULL`),
  title: varchar("title", { length: 200 }).notNull(),
  prompt: varchar("prompt", { length: 100 }).notNull(),
  text: text("text").notNull(),
  isHidden: boolean("is_hidden").notNull().default(false),
  isPg: boolean("is_pg").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  temperature: numeric("temperature", { precision: 10, scale: 2 })
    .notNull()
    .default(sql`0.7`),
  topP: numeric("top_p", { precision: 10, scale: 2 })
    .notNull()
    .default(sql`1`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at", { withTimezone: true }).default(sql`NULL`),
});

export const categories = createTable("categories", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  oldId: integer("old_id")
    .unique()
    .default(sql`NULL`),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at", { withTimezone: true }).default(sql`NULL`),
});

export const madlibCategories = createTable(
  "adlib_categories",
  {
    madlibId: uuid("adlib_id")
      .notNull()
      .references(() => adlibs.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.madlibId, table.categoryId] }),
  }),
);

export const adlibResults = createTable("adlib_results", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  adlibId: uuid("adlib_id")
    .notNull()
    .references(() => adlibs.id, { onDelete: "cascade" }),
  resultText: text("result_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at", { withTimezone: true }).default(sql`NULL`),
});

export const adlibsRelations = relations(adlibs, ({ many }) => ({
  categories: many(madlibCategories),
  adlibResults: many(adlibResults),
}));
export const madlibCategoriesRelations = relations(
  madlibCategories,
  ({ one }) => ({
    adlib: one(adlibs, {
      fields: [madlibCategories.madlibId],
      references: [adlibs.id],
    }),
    category: one(categories, {
      fields: [madlibCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
export const adlibResultsRelations = relations(adlibResults, ({ one }) => ({
  adlib: one(adlibs, {
    fields: [adlibResults.adlibId],
    references: [adlibs.id],
  }),
}));
export const categoriesRelations = relations(categories, ({ many }) => ({
  madlibs: many(madlibCategories),
}));


export const llmBrands = createTable("llm_brands", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name")
    .notNull()
    .unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at", { withTimezone: true }).default(sql`NULL`),
});

export const llmModels = createTable("llm_models", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => llmBrands.id, { onDelete: "cascade" }),
  name: text("name")
    .notNull(),
  isAvailable: boolean("is_available").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at", { withTimezone: true }).default(sql`NULL`),
});

export const llmBrandsRelations = relations(llmBrands, ({ many }) => ({
  models: many(llmModels),
}));

export const llmModelsRelations = relations(llmModels, ({ one }) => ({
  brand: one(llmBrands, {
    fields: [llmModels.brandId],
    references: [llmBrands.id],
  }),
}));