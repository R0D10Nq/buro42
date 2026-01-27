import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundDecor } from "@/components/animations/BackgroundDecor";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageLoader } from "@/components/animations/PageLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "БЮРО — Студия разработки",
  description: "Дизайн и разработка цифровых продуктов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <BackgroundDecor />
        <PageLoader />
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
