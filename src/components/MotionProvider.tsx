"use client";

import { MotionConfig } from "motion/react";

// 시스템에서 '동작 줄이기'를 켠 사용자에게는 움직임을 줄인다.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
