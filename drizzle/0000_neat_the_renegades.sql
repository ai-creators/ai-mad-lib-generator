CREATE TABLE IF NOT EXISTS "ai-mad-lib-generator_adlibs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"old_id" integer DEFAULT NULL,
	"title" varchar(200) NOT NULL,
	"prompt" varchar(100) NOT NULL,
	"text" text NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"is_pg" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"temperature" numeric(10, 2) DEFAULT 0.7 NOT NULL,
	"top_p" numeric(10, 2) DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL,
	CONSTRAINT "ai-mad-lib-generator_adlibs_old_id_unique" UNIQUE("old_id")
);
