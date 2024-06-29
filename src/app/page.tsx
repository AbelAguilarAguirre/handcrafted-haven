import Image from "next/image";
import Hero from "./ui/hero";
import Features from "./ui/features";
import Subscribe from "./ui/subscribe";
import Benefit from "./ui/benefit";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Benefit />
      <Subscribe />
    </main>
  );
}
