import { Suspense } from "react";
import Link from "next/link";
import { DetailScreen } from "@/components/DetailScreen";
import { getMemo } from "@/lib/memo-db";

async function MemoDetail({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const memo = await getMemo(id);

  if (!memo) {
    return (
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col items-center justify-center gap-space-16 px-space-16">
        <p className="text-body-md text-text-secondary">찾을 수 없는 메모예요.</p>
        <Link href="/" className="text-label-md text-primary">
          홈으로 가기
        </Link>
      </div>
    );
  }
  return <DetailScreen memo={memo} />;
}

export default function MemoDetailPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense>
      <MemoDetail params={params} />
    </Suspense>
  );
}
