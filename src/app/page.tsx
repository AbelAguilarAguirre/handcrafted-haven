import Image from "next/image";
import Header from "./ui/header";
import Hero from "./ui/hero";
import Features from "./ui/features";
import Subscribe from "./ui/subscribe";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Subscribe />
    </main>
  );
}
