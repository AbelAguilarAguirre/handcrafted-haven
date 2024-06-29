import Image from "next/image";

export default function Benefit() {
  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col gap-4 lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Experience the Ease of Buying Beautiful Handcrafted Pieces
          </h2>
          <p className="text-gray-600 mb-4">
            Discover a seamless shopping experience on our platform, where you
            can easily find and purchase exquisite handcrafted items. Our
            user-friendly interface makes it simple to explore a wide array of
            unique pieces, each crafted with care and precision.
          </p>
          <p className="text-gray-600">
            Enjoy the convenience of rating artists and their work, helping you
            and others identify the finest creations. Effortlessly search for
            top-rated artisans and find the perfect addition to your collection
            with confidence and ease.
          </p>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
          <Image
            src={"/benefit.jpg"}
            alt="Art by Yugixe"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
