import { useState, useEffect } from "react";
import { ProductData } from "types";
import FavoriteHeart from "~/components/icons/favorite-icon";
import Heart from "~/components/icons/Heart";
import { addWishAPI, removeWishAPI } from "~/utils/account";
import useIfLoggedIn from "~/utils/useIfLoggedIn";
import HeartActive from "./icons/HeartActive";


export default function WishlistBtn({
    product,
    inWishlistPage,
}: {
    product: ProductData;
    inWishlistPage: Boolean;
}) {
    const [isWishlist, setIsWishlist] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localStorageWishlistItems = localStorage.getItem("wishlistItems");
            const wishlistItems = localStorageWishlistItems
                ? JSON.parse(localStorageWishlistItems)
                : [];

            const isProductInLocalStorageWishlist = wishlistItems.some(
                (item: ProductData) => String(item.id) === String(product.id)
            );
            setIsWishlist(inWishlistPage || isProductInLocalStorageWishlist);
        }

    }, [product.id, inWishlistPage]);

    const handleAddingWishlist = async (data: ProductData) => {
        const { id } = data;

        if (useIfLoggedIn()) {
            try {
                if (isWishlist) {
                    // Remove product from wishlist using removeWishAPI
                    const response = await removeWishAPI(id);
                    if (response.status === "success") {
                    }
                } else {
                    const response = await addWishAPI(id);
                    if (response.status === "success" && response.msg_code === "wishlist_add_success") {
                        console.log('addWishAPI>success')
                    } else if (response.status === "error" && response.msg_code === "wishlist_add_error" && response.msg === "Product Already Exist in Wishlist") {
                        console.log('addWishAPI>error');
                    }
                }
            } catch (error) {
                console.log("Failed to add/remove wishlist:", error);
            }
            const localStorageWishlistItems = localStorage.getItem("wishlistItems");
            let updatedWishlistItems: ProductData[] = [];
            if (localStorageWishlistItems) {
                updatedWishlistItems = JSON.parse(localStorageWishlistItems) as ProductData[];
            }

            if (isWishlist) {
                updatedWishlistItems = updatedWishlistItems.filter((item: ProductData) => item.id !== id);
            } else {
                updatedWishlistItems.push({ ...data });
            }

            localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
        } else {
            // User is not logged in, update local storage wishlist
            let updatedWishlistItems: ProductData[];
            if (isWishlist) {
                // Remove product from local storage wishlist
                const localStorageWishlistItems = localStorage.getItem("wishlistItems");
                if (localStorageWishlistItems) {
                    const wishlistItems = JSON.parse(localStorageWishlistItems) as ProductData[];
                    updatedWishlistItems = wishlistItems.filter((item: ProductData) => item.id !== id);
                    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
                }
            } else {
                // Add product to local storage wishlist
                const localStorageWishlistItems = localStorage.getItem("wishlistItems");
                if (localStorageWishlistItems) {
                    const wishlistItems = JSON.parse(localStorageWishlistItems) as ProductData[];
                    updatedWishlistItems = [...wishlistItems, { ...data }];
                } else {
                    updatedWishlistItems = [{ ...data }];
                }
                localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlistItems));
            }
        }
    };


    const handleWishlistClick = () => {
        handleAddingWishlist(product);
        setIsWishlist(!isWishlist);
        const parentDiv = document.getElementById(`wishlist-item-${product.id}`);
        if (parentDiv) {
            parentDiv.remove();
        }
    };

    return (
        <button
            className={`w-8 h-8 rounded-full bg-primary-400 absolute top-2 right-2 z-10 flex justify-center items-center`}
            onClick={handleWishlistClick}
        >
            {isWishlist ? <HeartActive /> : <Heart />}
        </button>
    );
}