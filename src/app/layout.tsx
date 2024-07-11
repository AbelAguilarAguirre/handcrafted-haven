import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Header from "./ui/header";
import { getServerSession } from 'next-auth';
import SessionProvider from '@/app/SessionProvider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
