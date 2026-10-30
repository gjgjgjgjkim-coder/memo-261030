import { Suspense } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { listMemos } from "@/lib/memo-db";

async function HomeMemos() {
  return <HomeScreen memos={await listMemos()} />;
}

export default function Home() {
  return (
    <Suspense>
      <HomeMemos />
    </Suspense>
  );
}
