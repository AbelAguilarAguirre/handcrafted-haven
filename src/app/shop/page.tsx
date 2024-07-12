import ProductList from '../ui/shop/product-list';

export default function Page() {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full min-h-screen py-20">
                <h1 className="text-4xl font-bold text-center">Shop Page</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <ProductList maxPrice={'5000'} />
            </div>
        </>
    );
}
