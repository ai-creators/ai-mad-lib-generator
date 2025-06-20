import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedLLMs() {
  const { data: brand, error: brandError } = await supabase
    .from("llm_brands")
    .insert({ name: "OpenAI" })
    .select("id")
    .single();

  if (brandError) {
    console.error("Error inserting brand:", brandError);
    process.exit(1);
  }

  const models = [
    "gpt-3.5-turbo",
    "gpt-4",
    "gpt-4o-mini",
    "gpt-4o"
  ].map((name) => ({ brand_id: brand.id, name }));

  const { data: modelRows, error: modelsError } = await supabase
    .from("llm_models")
    .insert(models)
    .select("id,name");

  if (modelsError) {
    console.error("Error inserting models:", modelsError);
    process.exit(1);
  }

  console.log("Inserted models:", modelRows);
  process.exit(0);
}

seedLLMs();
