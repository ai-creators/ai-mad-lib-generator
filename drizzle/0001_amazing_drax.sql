CREATE TABLE IF NOT EXISTS "ai_adlibs_llm_brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL,
	CONSTRAINT "ai_adlibs_llm_brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_adlibs_llm_models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_available" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_llm_models" ADD CONSTRAINT "ai_adlibs_llm_models_brand_id_ai_adlibs_llm_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."ai_adlibs_llm_brands"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
