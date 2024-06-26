import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Header from "./ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Handcrafted Haven | Home",
  description:
    "Discover unique, handcrafted items and support talented artisans at Handcrafted Haven. Shop one-of-a-kind creations or sell your handmade products with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
