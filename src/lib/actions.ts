"use server";

import { revalidatePath } from "next/cache";
import type { Block, MemoLabel } from "./memos";
import { supabase } from "./supabase";

export async function createMemo(input: {
  title: string;
  category: string;
  label: MemoLabel;
  body: Block[];
}) {
  const { error } = await supabase.from("memos").insert(input);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}
