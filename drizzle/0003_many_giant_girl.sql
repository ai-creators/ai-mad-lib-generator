CREATE TABLE IF NOT EXISTS "ai-mad-lib-generator_adlib_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adlib_id" uuid NOT NULL,
	"result_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai-mad-lib-generator_adlib_results" ADD CONSTRAINT "ai-mad-lib-generator_adlib_results_adlib_id_ai-mad-lib-generator_adlibs_id_fk" FOREIGN KEY ("adlib_id") REFERENCES "public"."ai-mad-lib-generator_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
