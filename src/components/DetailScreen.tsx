import type { Block, Memo, Segment } from "@/lib/memos";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "./Badge";
import { ButtonIcon } from "./ButtonIcon";
import { ButtonPrimary } from "./ButtonPrimary";

function Text({ segments }: { segments: Segment[] }) {
  return segments.map((s, i) =>
    typeof s === "string" ? (
      <span key={i}>{s}</span>
    ) : (
      <strong key={i} className="font-bold">
        {s.b}
      </strong>
    ),
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-title-lg text-text-primary">{block.text}</h2>;
    case "h3":
      return <h3 className="text-title-md text-text-primary">{block.text}</h3>;
    case "p":
      return (
        <p className="text-body-md text-text-secondary">
          <Text segments={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-space-4">
          {block.items.map((item) => (
            <li key={item} className="flex gap-space-8 text-body-md text-text-secondary">
              <span aria-hidden>•</span>
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export function DetailScreen({ memo }: { memo: Memo }) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 pb-space-34 pt-space-48">
      <BlurFade>
        <nav className="flex items-center justify-between">
          <ButtonIcon icon="chevron-left" label="뒤로가기" href="/" />
          <div className="flex">
            <ButtonIcon icon="pin-lg" label="고정" />
            <ButtonIcon icon="share" label="공유" />
            <ButtonIcon icon="more" label="더보기" />
          </div>
        </nav>
      </BlurFade>
      <main className="min-h-0 flex-1 overflow-y-auto">
        <BlurFade delay={0.05}>
          <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
            <div className="flex items-center gap-space-8">
              <Badge label={memo.category} color={memo.label} />
              <p className="text-caption-sm text-text-muted">{memo.createdAt}</p>
            </div>
            <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
            <hr className="border-t border-border-default" />
            <div className="flex flex-col gap-space-12">
              {memo.body.map((block, i) => (
                <BlurFade key={i} delay={0.15 + i * 0.05}>
                  <BlockView block={block} />
                </BlurFade>
              ))}
            </div>
          </article>
        </BlurFade>
      </main>
      <BlurFade delay={0.3} direction="up">
        <ButtonPrimary label="수정하기" />
      </BlurFade>
    </div>
  );
}
