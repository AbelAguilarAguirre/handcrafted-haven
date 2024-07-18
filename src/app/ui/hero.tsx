import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src={"/images/hero.jpg"}
          alt="Art by Surene Palvie"
          fill
          style={{ objectFit: "cover"}}
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full bg-black bg-opacity-50 text-white p-8 md:p-16 lg:p-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Discover Handcrafted Masterpieces
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">
          Explore our collection of unique, handcrafted items made with love and
          care. Find the perfect piece that speaks to you or sell your own
          creations.
        </p>
        <div className="mt-8 flex space-x-4">
            <Link
            href={"/shop"}>
                <button className="px-6 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                    Shop Now
                </button>
            </Link>
            <Link
            href={"/"}>
                <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                    Sell Your Art
                </button>
            </Link>

        </div>
      </div>
    </div>
  );
};
