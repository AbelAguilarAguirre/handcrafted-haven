import ProductsTable from '@/app/ui/profile/table';
import Pagination from '@/app/ui/profile/pagination';
import { fetchProductsByUserId } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const products = await fetchProductsByUserId(id);
    return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <ProductsTable products={products} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={1} />
            </div>
        </div>
    );
}
