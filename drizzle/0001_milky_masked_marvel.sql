CREATE TABLE IF NOT EXISTS "ai-mad-lib-generator_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"old_id" integer DEFAULT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL,
	CONSTRAINT "ai-mad-lib-generator_categories_old_id_unique" UNIQUE("old_id")
);
