import ProductsTable from '@/app/ui/profile/table';
import { fetchProductsByUserId, fetchProductsPages } from '@/app/lib/data';
import { UUID } from 'crypto';
import AuthoriseComponent from '@/app/ui/authorise-test'; // This is just a test component for showing authorisation, delete later

export default async function Page({ params }: { params: { id: UUID } }) {
    const id = params.id;
    try {
        const products = await fetchProductsByUserId(id);
        const totalPages = await fetchProductsPages(id);
        return (
            <div className="flex flex-col items-center min-h-[70vh]">
                <AuthoriseComponent params={params}/> {/* Delete this later, this is just an example component checking if user logged in is the owner of profile */}
                <div>
                    <ProductsTable products={products ?? []} params={params} totalPages={totalPages}/>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Database error:", error);
    }
}
