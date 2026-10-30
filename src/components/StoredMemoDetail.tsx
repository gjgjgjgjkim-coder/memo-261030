"use client";

import Link from "next/link";
import { useStoredMemos } from "@/lib/memo-store";
import { DetailScreen } from "./DetailScreen";

// 이 브라우저에 저장한 메모의 상세. 저장소는 화면이 붙은 뒤에야 읽을 수 있다.
export function StoredMemoDetail({ id }: { id: string }) {
  const memo = useStoredMemos().find((m) => m.id === id);

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
