import { ProductDetails } from "../../ui/product/product";
import { UUID } from 'crypto';
import { fetchProductByProductId } from "../../lib/data";


export default async function Page({ params }: { params: { id: UUID } }) {
  const id = params.id;
  const product = await fetchProductByProductId(params.id);
  return (
      <ProductDetails product={product} />
    );
}