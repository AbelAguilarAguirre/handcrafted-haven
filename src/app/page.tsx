import Hero from "./ui/hero";
import Features from "./ui/features";
import Subscribe from "./ui/subscribe";
import Benefit from "./ui/benefit";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Handcrafted Haven | Home",
};

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
