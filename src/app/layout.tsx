import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "메모",
  description: "간단한 메모 앱",
  appleWebApp: { capable: true, title: "메모", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#3182f6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
