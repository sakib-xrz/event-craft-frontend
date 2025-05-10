import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/shared/global-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventCraft - Plan, Join, Celebrate",
  description: "Your all-in-one platform for event planning and participation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
