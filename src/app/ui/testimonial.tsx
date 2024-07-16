import Image from "next/image";

export default function Testimonial() {
  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col gap-4 lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left md:text-left">
            Read what our customers think...
          </h2>
          <p className="text-gray-600 mb-4">
            &quot;Handcrafted Haven is a great place to find unique items by
            artists from all over!&quot;
          </p>
          <p className="text-gray-600 mb-4">
            &quot;I have really enjoyed shopping for my home on Handcrafted
            Haven!&quot;
          </p>
          <p className="text-gray-600 mb-4">
            &quot;You have to experience Handcrafted Haven! You won&apos;t be
            disappointed!&quot;
          </p>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
          <Image
            src={"/testimonial.jpg"}
            alt="Silhouettes of people jumping"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};