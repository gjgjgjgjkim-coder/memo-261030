import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "메모",
    short_name: "메모",
    description: "간단한 메모 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f4f6",
    theme_color: "#3182f6",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
