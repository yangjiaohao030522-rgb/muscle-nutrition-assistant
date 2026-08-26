import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "增肌营养助手",
  description: "每天看缺口、记饮食、配下一顿。",
  openGraph: { title: "增肌营养助手", description: "今天还差什么，下一顿该吃什么", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "增肌营养助手", description: "今天还差什么，下一顿该吃什么", images: ["/og.png"] },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "增肌营养助手", statusBarStyle: "black-translucent" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};
export const viewport: Viewport = { themeColor: "#0B0D0E", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
