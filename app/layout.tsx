import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guard",
  description: "统一授权中心",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
