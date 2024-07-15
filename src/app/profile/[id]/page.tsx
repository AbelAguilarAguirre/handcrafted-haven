import ProductsTable from '@/app/ui/profile/table';
import Pagination from '@/app/ui/profile/pagination';
import { fetchProductsByUserId } from '@/app/lib/data';
import { UUID } from 'crypto';


export default async function Page({ params }: { params: { id: UUID } }) {
    const id = params.id;
    try {
        const products = await fetchProductsByUserId(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                <div>
                    <div>
                    </div>
                    <div>
                        <ProductsTable products={products ?? []} />
                    </div>
                </div>
                <div className=" mt-7 mb-2 flex w-full justify-center">
                    <Pagination totalPages={1} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
