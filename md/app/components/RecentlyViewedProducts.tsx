import { useProductStore } from "~/stores/product";
import ProductWidget from "./product/ProductWidget";

export default function RecentlyViewedProducts() {
    const {
        recentItems,
    } = useProductStore();
    // console.log('recentItems', recentItems)
    return (
        <div className="mt-10 bg-white border-t-2">
            <div className="container px-4 py-16 mx-auto sm:py-24 sm:px-6">
                <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">Recently Viewed Products</h2>
                <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">

                    {recentItems.sort(() => Math.random() - 0.5)
                        .slice(0, 5)
                        .map((productData: any) => (
                            <ProductWidget product={productData} key={productData.id} />
                        ))}
                </div>
            </div>
        </div>
    )
}
