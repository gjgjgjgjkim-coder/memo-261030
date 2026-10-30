import { Suspense } from "react";
import { DetailScreen } from "@/components/DetailScreen";
import { StoredMemoDetail } from "@/components/StoredMemoDetail";
import { getMemo, memos } from "@/lib/memos";

export function generateStaticParams() {
  return memos.map((m) => ({ id: m.id }));
}

async function MemoDetail({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const memo = getMemo(id);
  // 예시 메모가 아니면 이 브라우저에 저장한 메모일 수 있다.
  if (!memo) return <StoredMemoDetail id={id} />;

  return <DetailScreen memo={memo} />;
}

export default function MemoDetailPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense>
      <MemoDetail params={params} />
    </Suspense>
  );
}
