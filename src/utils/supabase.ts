import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(process.env.REACT_APP_SUPABASE_URL as string, process.env.REACT_APP_SUPABASE_KEY as string);

export async function checkIfRegistered(address: string) {
  try {
    const snapshot = await supabase.from("whitelist").select("data")
    return snapshot.data?.map(({ data }) => data).includes(address) || false;
  } catch (error) {
    throw error;
  }
}

export async function countParticipants() {
  try {
    const val = await supabase.from("whitelist").select("*");
    return val.data?.length || 0;
  } catch (error) {
    throw error;
  }
}

export async function addToWhitelist(address: string) {
  try {
    const dr = await supabase.from("whitelist").insert({ data: address });
    return console.log(`New doc written ${dr.data}`);
  } catch (error) {
    throw error;
  }
}