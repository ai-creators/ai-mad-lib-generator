// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTableCreator,
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
export const createTable = pgTableCreator(
  (name) => `ai-mad-lib-generator_${name}`,
);

export const adlibs = createTable("adlibs", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
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
