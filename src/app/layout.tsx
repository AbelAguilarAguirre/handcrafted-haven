import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Handcrafted Haven | %s",
    default: "Handcrafted Haven",
  },
  description: 
    "Discover unique, handcrafted items and support talented artisans at Handcrafted Haven. Shop one-of-a-kind creations or sell your handmade products with ease.",
  metadataBase: new URL("https://handcrafted-haven-beta.vercel.app"),
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
        <Footer />
      </body>
    </html>
  );
}
