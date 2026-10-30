import { toMemo, type Memo, type MemoRow } from "./memos";
import { supabase } from "./supabase";

export async function listMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<MemoRow[]>();
  if (error) throw new Error(error.message);
  return data.map(toMemo);
}

export async function getMemo(id: string): Promise<Memo | null> {
  const { data } = await supabase
    .from("memos")
    .select("*")
    .eq("id", id)
    .maybeSingle<MemoRow>();
  return data ? toMemo(data) : null;
}
