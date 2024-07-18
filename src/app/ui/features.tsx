import Image from "next/image";

export default function Features() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Our Features</h2>
          <p className="mt-4 text-gray-600">
            Discover the unique aspects that make our platform special.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="text-center p-6">
              <Image
                src="/images/collection.svg"
                width={48}
                height={48}
                className="mx-auto mb-4"
                alt="Collection by Boxicons Interface Icons"
              />
              <h3 className="text-xl font-semibold">Exquisite Collection</h3>
              <p className="mt-2 text-gray-600">
                Explore a diverse range of handcrafted items, each with its own
                story and charm.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="text-center p-6">
              <Image
                src="/images/handshake.svg"
                width={48}
                height={48}
                className="mx-auto mb-4"
                alt="Handshake by Dazzle Line Icons"
              />
              <h3 className="text-xl font-semibold">Support Artisans</h3>
              <p className="mt-2 text-gray-600">
                Directly support skilled artisans by purchasing their unique
                creations.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="text-center p-6">
              <Image
                src="/images/dollar.svg"
                width={48}
                height={48}
                className="mx-auto mb-4"
                alt="Dollar currency symbol"
              />
              <h3 className="text-xl font-semibold">Sell with Ease</h3>
              <p className="mt-2 text-gray-600">
                Join our community of creators and easily list your handmade
                products for sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
