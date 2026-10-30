import { useSyncExternalStore } from "react";
import type { Block, Memo, MemoLabel, Segment } from "./memos";

const MEMOS_KEY = "memo-app:memos";
const DRAFT_KEY = "memo-app:draft";
const CHANGE_EVENT = "memo-app:change";

// 로컬 스토리지에 저장하는 모양
export type StoredMemo = {
  id: string;
  title: string;
  category: string;
  label: MemoLabel;
  body: Block[];
  savedAt: number;
};

export type Draft = {
  title: string;
  category: string;
  label: MemoLabel;
  body: Block[];
};

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 공간이 막혀 있어도 화면은 계속 쓸 수 있게 둔다.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function writeDraft(draft: Draft) {
  write(DRAFT_KEY, draft);
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

export function addMemo(input: Omit<StoredMemo, "id" | "savedAt">) {
  const savedAt = Date.now();
  const memo: StoredMemo = { ...input, id: `m-${savedAt.toString(36)}`, savedAt };
  write(MEMOS_KEY, [memo, ...(read<StoredMemo[]>(MEMOS_KEY) ?? [])]);
}

function segmentText(segments: Segment[]) {
  return segments.map((s) => (typeof s === "string" ? s : s.b)).join("");
}

export function blockText(block: Block) {
  if (block.type === "p") return segmentText(block.text);
  if (block.type === "list") return block.items.join(", ");
  return block.text;
}

function dayLabel(savedAt: number) {
  const startOfDay = (t: number) => new Date(t).setHours(0, 0, 0, 0);
  const days = Math.round((startOfDay(Date.now()) - startOfDay(savedAt)) / 86_400_000);
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  return new Date(savedAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
}

function toMemo(stored: StoredMemo): Memo {
  const lead = stored.body.find((b) => b.type !== "h2" && b.type !== "h3") ?? stored.body[0];
  return {
    id: stored.id,
    title: stored.title,
    preview: lead ? blockText(lead) : "",
    date: dayLabel(stored.savedAt),
    createdAt: new Date(stored.savedAt).toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    label: stored.label,
    category: stored.category,
    pinned: false,
    inHome: true,
    body: stored.body,
  };
}

// useSyncExternalStore가 같은 값을 같은 참조로 받도록, 저장된 글이 바뀔 때만 다시 만든다.
const EMPTY: Memo[] = [];
let cache: { raw: string | null; memos: Memo[] } = { raw: null, memos: EMPTY };

function getSnapshot() {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(MEMOS_KEY);
  } catch {}
  if (raw !== cache.raw) {
    let memos = EMPTY;
    try {
      memos = raw ? (JSON.parse(raw) as StoredMemo[]).map(toMemo) : EMPTY;
    } catch {}
    cache = { raw, memos };
  }
  return cache.memos;
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

// 서버와 첫 화면에서는 빈 목록이라, 저장된 메모는 화면이 붙은 뒤에 나타난다.
export function useStoredMemos() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
