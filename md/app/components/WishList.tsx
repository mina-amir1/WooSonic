import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import ProductWidget from "./product/ProductWidget";
import Cookies from "js-cookie";
import { getWishAPI } from "~/utils/account";
import { ProductData, ErrorResponse } from 'types';
import { useTranslation } from "react-i18next";

export default function WishList() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<ProductData[]>([]);
    const user_id = Cookies.get("user_id");
    const token = Cookies.get("token");

    useEffect(() => {
        if (!user_id || !token) {
            return;
        }

        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await getWishAPI();
                setIsLoading(false);
                if ((response as ErrorResponse).status === "error") {
                    throw new Error((response as ErrorResponse).msg);
                }
                setData(response as ProductData[]);
                localStorage.setItem("wishlistItems", JSON.stringify(response));
            } catch (error) {
                console.error(error.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const localStorageWishlistItems = localStorage.getItem("wishlistItems");
        if (localStorageWishlistItems) {
            const wishlistItems = JSON.parse(localStorageWishlistItems);
            setData(wishlistItems);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const localStorageWishlistItems = localStorage.getItem("wishlistItems");
            if (localStorageWishlistItems) {
                const wishlistItems = JSON.parse(localStorageWishlistItems);
                setData(wishlistItems);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="">
            <div className="">
                <div className="flex items-center justify-between pt-2 pb-5 border-b-2 border-gray-200 border-solid">
                    <h1 className="text-3xl">{t("nav.my_wishlist")}</h1>
                </div>
                <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : data && data.length > 0 ? (
                        data.map((productData, index) => (
                            <ProductWidget product={productData} key={index} wishlist={true} />
                        ))
                    ) : (
                        <div className="w-full col-span-4 text-center">
                            <p className="text-gray-400 mb-5 text-lg">
                                {t("common.no_wishlist")}
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700"
                            >
                                {t("common.shop_now")}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
