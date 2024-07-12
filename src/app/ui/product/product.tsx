import Rating from "@mui/material/Rating";
import Image from "next/image";
import { Product } from "../../lib/definitions";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-8 p-8 items-center justify-center text-center md:text-left">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Image
          src={product.image_url}
          width={400}
          height={400}
          alt={product.name}
          className="rounded-md mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold my-2">{product.name}</h1>
        <Rating
          size="medium"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
        />
        {/* Continue with the rest of your component */}
        <p className="text-xl my-2">${product.price}</p>
        <p className="my-2">{product.description}</p>

        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
