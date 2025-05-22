ALTER TABLE "ai_adlibs_adlib_tones" ADD COLUMN "character" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_adlibs_adlib_tones" ADD COLUMN "tone_level" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_adlibs_adlib_tones" ADD CONSTRAINT "ai_adlibs_adlib_tones_tone_level_unique" UNIQUE("tone_level");