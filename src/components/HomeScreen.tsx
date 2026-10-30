"use client";

import { useState } from "react";
import { ButtonPrimary } from "./ButtonPrimary";
import { CardHeader } from "./CardHeader";
import { Chip } from "./Chip";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { categories as memoCategories, type Memo } from "@/lib/memos";
import { MemoItem } from "./MemoItem";

const categories = ["전체", ...memoCategories];

export function HomeScreen({ memos }: { memos: Memo[] }) {
  const [category, setCategory] = useState("전체");

  const visible = memos.filter(
    (m) => m.inHome && (category === "전체" || m.category === category),
  );
  const pinned = visible.filter((m) => m.pinned);
  const recent = visible.filter((m) => !m.pinned);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 pb-space-34 pt-space-64">
      <main className="flex min-h-0 flex-1 flex-col gap-space-16 overflow-y-auto">
        <BlurFade>
          <header className="flex flex-col gap-space-8 px-space-8">
            <p className="text-caption-md text-text-muted">10월 30일 금요일</p>
            <h1 className="text-heading-xl text-text-primary">
              오늘까지 메모를
              <br />
              <NumberTicker
                value={memos.length}
                delay={0.3}
                className="tracking-[inherit] text-primary dark:text-primary"
              />
              <span className="text-primary">개</span> 남겼어요
            </h1>
          </header>
        </BlurFade>
        <BlurFade delay={0.05}>
          <div className="flex gap-space-8 overflow-x-auto p-space-4">
            {categories.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={category === name}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
        </BlurFade>
        {pinned.length > 0 && (
          <BlurFade delay={0.1}>
            <section className="overflow-hidden rounded-xl bg-surface-card py-space-8">
              <CardHeader title="고정한 메모" pin />
              {pinned.map((m, i) => (
                <BlurFade key={m.id} delay={0.15 + i * 0.05}>
                  <MemoItem {...m} />
                </BlurFade>
              ))}
            </section>
          </BlurFade>
        )}
        {recent.length > 0 && (
          <BlurFade delay={0.15}>
            <section className="overflow-hidden rounded-xl bg-surface-card py-space-8">
              <CardHeader title="최근 메모" actionHref="/memos" />
              {recent.map((m, i) => (
                <BlurFade key={m.id} delay={0.2 + i * 0.05}>
                  <MemoItem {...m} />
                </BlurFade>
              ))}
            </section>
          </BlurFade>
        )}
      </main>
      <BlurFade delay={0.3} direction="up">
        <ButtonPrimary label="새 메모 쓰기" href="/memos/new" icon />
      </BlurFade>
    </div>
  );
}
