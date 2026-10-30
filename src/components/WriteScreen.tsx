"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/ui/blur-fade";
import { htmlToBlocks, writeBlocks } from "@/lib/editor-blocks";
import { addMemo, clearDraft, useDraft, writeDraft, type Draft } from "@/lib/memo-store";
import { categories, type MemoLabel } from "@/lib/memos";
import { ButtonIcon } from "./ButtonIcon";
import { ButtonPrimary } from "./ButtonPrimary";
import { Chip } from "./Chip";
import { EditorToolbar, type FormatName, type FormatState } from "./EditorToolbar";
import { InputField } from "./InputField";
import { LabelDot } from "./LabelDot";

const labels: { color: MemoLabel; name: string }[] = [
  { color: "blue", name: "파란색" },
  { color: "green", name: "초록색" },
  { color: "orange", name: "주황색" },
  { color: "pink", name: "분홍색" },
];

const noFormat: FormatState = { bold: false, h2: false, h3: false, list: false };

export function WriteScreen() {
  const draft = useDraft();
  // 쓰다 만 글을 읽기 전에는 그리지 않는다.
  if (draft === undefined) return null;
  return <WriteForm draft={draft} />;
}

function WriteForm({ draft }: { draft: Draft | null }) {
  const router = useRouter();
  // 처음 열 때의 쓰다 만 글만 쓴다. 이후 임시 저장으로 바뀐 값은 다시 읽지 않는다.
  const [initial] = useState(draft);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "개인");
  const [label, setLabel] = useState<MemoLabel>(initial?.label ?? "blue");
  const [bodyVersion, setBodyVersion] = useState(0);
  const [format, setFormat] = useState(noFormat);
  const [draftSaved, setDraftSaved] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const dirty = useRef(false);

  useEffect(() => {
    if (initial && editorRef.current) writeBlocks(editorRef.current, initial.body);
  }, [initial]);

  // 손을 댄 뒤에는 잠깐 멈추면 임시 저장한다.
  useEffect(() => {
    if (!dirty.current) return;
    const timer = setTimeout(() => {
      writeDraft({
        title,
        category,
        label,
        body: editorRef.current ? htmlToBlocks(editorRef.current) : [],
      });
      setDraftSaved(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [title, category, label, bodyVersion]);

  // 커서가 있는 글의 서식을 서식 막대에 보여 준다.
  useEffect(() => {
    const update = () => {
      const editor = editorRef.current;
      const anchor = document.getSelection()?.anchorNode;
      if (!editor || !anchor || !editor.contains(anchor)) return;
      const block = String(document.queryCommandValue("formatBlock")).toLowerCase();
      setFormat({
        bold: document.queryCommandState("bold"),
        h2: block === "h2",
        h3: block === "h3",
        list: document.queryCommandState("insertUnorderedList"),
      });
    };
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);

  function touch() {
    dirty.current = true;
    setDraftSaved(false);
  }

  function applyFormat(name: FormatName) {
    editorRef.current?.focus();
    if (name === "bold") document.execCommand("bold");
    else if (name === "list") document.execCommand("insertUnorderedList");
    else document.execCommand("formatBlock", false, format[name] ? "div" : name);
    touch();
    setBodyVersion((v) => v + 1);
  }

  function save() {
    const trimmed = title.trim();
    if (!trimmed) {
      titleRef.current?.focus();
      return;
    }
    addMemo({
      title: trimmed,
      category,
      label,
      body: editorRef.current ? htmlToBlocks(editorRef.current) : [],
    });
    clearDraft();
    router.push("/");
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 pb-space-34 pt-space-48">
      <BlurFade>
        <nav className="flex items-center justify-between">
          <ButtonIcon icon="chevron-left" label="뒤로가기" href="/" />
          <p className="text-caption-sm text-text-muted" aria-live="polite">
            {draftSaved ? "자동 저장됨" : ""}
          </p>
        </nav>
      </BlurFade>
      <main className="flex min-h-0 flex-1 flex-col gap-space-12 overflow-y-auto">
        <BlurFade delay={0.05}>
          <InputField
            ref={titleRef}
            label="제목"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={(value) => {
              touch();
              setTitle(value);
            }}
          />
        </BlurFade>
        <BlurFade delay={0.1}>
          <div className="flex flex-col gap-space-12 px-space-8 py-space-4">
            <div className="flex items-center gap-space-8">
              <p className="text-caption-sm text-text-muted">분류</p>
              {categories.map((name) => (
                <Chip
                  key={name}
                  label={name}
                  selected={category === name}
                  onClick={() => {
                    touch();
                    setCategory(name);
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-space-8">
              <p className="text-caption-sm text-text-muted">색</p>
              {labels.map(({ color, name }) => (
                <LabelDot
                  key={color}
                  color={color}
                  name={name}
                  selected={label === color}
                  onClick={() => {
                    touch();
                    setLabel(color);
                  }}
                />
              ))}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={0.15}>
          <div className="overflow-hidden rounded-lg bg-surface-card ring-2 ring-transparent ring-inset focus-within:ring-primary">
            <EditorToolbar active={format} onFormat={applyFormat} />
            <hr className="border-t border-border-default" />
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-multiline
              aria-label="본문"
              data-placeholder="내용을 입력하세요"
              onInput={() => {
                touch();
                setBodyVersion((v) => v + 1);
              }}
              onPaste={(e) => {
                e.preventDefault();
                document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
              }}
              className="min-h-40 px-space-20 py-space-16 text-body-md text-text-secondary outline-none empty:before:text-text-muted empty:before:content-[attr(data-placeholder)] [&_b]:font-bold [&_b]:text-text-primary [&_h2]:text-title-lg [&_h2]:text-text-primary [&_h3]:text-title-md [&_h3]:text-text-primary [&_li]:pl-space-4 [&_ul]:list-disc [&_ul]:pl-space-16"
            />
          </div>
        </BlurFade>
      </main>
      <BlurFade delay={0.2} direction="up">
        <ButtonPrimary label="저장하기" onClick={save} />
      </BlurFade>
    </div>
  );
}
