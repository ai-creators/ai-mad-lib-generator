ALTER TABLE "ai_adlibs_adlibs" ADD COLUMN "tone_id" uuid DEFAULT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_adlibs_adlibs" ADD CONSTRAINT "ai_adlibs_adlibs_tone_id_ai_adlibs_adlib_tones_id_fk" FOREIGN KEY ("tone_id") REFERENCES "public"."ai_adlibs_adlib_tones"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
