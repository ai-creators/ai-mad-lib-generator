CREATE TABLE IF NOT EXISTS "ai-mad-lib-generator_madlib_categories" (
	"madlib_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ai-mad-lib-generator_madlib_categories_madlib_id_category_id_pk" PRIMARY KEY("madlib_id","category_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-mad-lib-generator_madlib_categories" ADD CONSTRAINT "ai-mad-lib-generator_madlib_categories_madlib_id_ai-mad-lib-generator_adlibs_id_fk" FOREIGN KEY ("madlib_id") REFERENCES "public"."ai-mad-lib-generator_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-mad-lib-generator_madlib_categories" ADD CONSTRAINT "ai-mad-lib-generator_madlib_categories_category_id_ai-mad-lib-generator_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."ai-mad-lib-generator_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
