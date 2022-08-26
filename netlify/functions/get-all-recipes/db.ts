import { createClient } from "@supabase/supabase-js";

const dbUrl = process.env.DATABASE_URL || "";
const apiKey = process.env.SUPABASE_SERVICE_API_KEY || "";
export const supabase = createClient(dbUrl, apiKey);
