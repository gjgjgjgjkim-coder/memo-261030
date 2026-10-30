import { useSyncExternalStore } from "react";
import type { Block, MemoLabel } from "./memos";

// 쓰다 만 글만 이 브라우저에 둔다. 저장한 메모는 Supabase에 있다.
const DRAFT_KEY = "memo-app:draft";
const CHANGE_EVENT = "memo-app:change";

export type Draft = {
  title: string;
  category: string;
  label: MemoLabel;
  body: Block[];
};

export function writeDraft(draft: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // 저장 공간이 막혀 있어도 화면은 계속 쓸 수 있게 둔다.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

let draftCache: { raw: string | null; draft: Draft | null } = { raw: null, draft: null };

function getDraftSnapshot() {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(DRAFT_KEY);
  } catch {}
  if (raw !== draftCache.raw) {
    let draft: Draft | null = null;
    try {
      draft = raw ? (JSON.parse(raw) as Draft) : null;
    } catch {}
    draftCache = { raw, draft };
  }
  return draftCache.draft;
}

// 서버와 첫 화면에서는 아직 읽지 못해 undefined, 읽은 뒤에는 쓰다 만 글 또는 null.
export function useDraft() {
  return useSyncExternalStore<Draft | null | undefined>(
    subscribe,
    getDraftSnapshot,
    () => undefined,
  );
}
