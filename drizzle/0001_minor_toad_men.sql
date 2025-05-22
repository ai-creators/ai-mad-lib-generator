CREATE TABLE IF NOT EXISTS "ai_adlibs_adlib_tones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"style" text NOT NULL,
	"prompt" text NOT NULL,
	"available" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone DEFAULT NULL
);
