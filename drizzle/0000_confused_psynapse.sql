CREATE TABLE IF NOT EXISTS "ai_adlibs_adlib_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adlib_id" uuid NOT NULL,
	"result_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_adlibs_adlibs" (
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
	CONSTRAINT "ai_adlibs_adlibs_old_id_unique" UNIQUE("old_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_adlibs_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"old_id" integer DEFAULT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL,
	CONSTRAINT "ai_adlibs_categories_old_id_unique" UNIQUE("old_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_adlibs_adlib_categories" (
	"adlib_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ai_adlibs_adlib_categories_adlib_id_category_id_pk" PRIMARY KEY("adlib_id","category_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlib_results" ADD CONSTRAINT "ai_adlibs_adlib_results_adlib_id_ai_adlibs_adlibs_id_fk" FOREIGN KEY ("adlib_id") REFERENCES "public"."ai_adlibs_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlib_categories" ADD CONSTRAINT "ai_adlibs_adlib_categories_adlib_id_ai_adlibs_adlibs_id_fk" FOREIGN KEY ("adlib_id") REFERENCES "public"."ai_adlibs_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlib_categories" ADD CONSTRAINT "ai_adlibs_adlib_categories_category_id_ai_adlibs_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."ai_adlibs_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
