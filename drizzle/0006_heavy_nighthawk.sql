CREATE TABLE IF NOT EXISTS "ai_adlibs_adlib_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adlib_id" uuid NOT NULL,
	"author_name" varchar(50) DEFAULT NULL,
	"body" text NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_adlibs_adlib_reactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"adlib_id" uuid NOT NULL,
	"reaction_type" varchar(20) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlib_comments" ADD CONSTRAINT "ai_adlibs_adlib_comments_adlib_id_ai_adlibs_adlibs_id_fk" FOREIGN KEY ("adlib_id") REFERENCES "public"."ai_adlibs_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlib_reactions" ADD CONSTRAINT "ai_adlibs_adlib_reactions_adlib_id_ai_adlibs_adlibs_id_fk" FOREIGN KEY ("adlib_id") REFERENCES "public"."ai_adlibs_adlibs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
