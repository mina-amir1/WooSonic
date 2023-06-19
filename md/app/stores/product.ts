import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { useState } from "react";

export type Item = {
  id: number;
  quantity: number;
  name: string;
  slug?: string;
  thumbnail?: string;
  main_img?: string;
  price?: string;
};

const recentProductsAtom = persistentAtom<Item[]>("recent-products", [], {
  listen: true,
  encode: JSON.stringify,
  decode: JSON.parse,
});

const wishlistItemsAtom = persistentAtom<Item[]>("wishlist-items", [], {
  listen: true,
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const useProductStore = () => {
  const recentStore = useStore(recentProductsAtom);
  const wishlistStore = useStore(wishlistItemsAtom);
  const [recentItems, setRecentItems] = useState<Item[]>(recentStore ?? []);
  const [wishlistItems, setWishlistItems] = useState<Item[]>(wishlistStore ?? []);

  const addToRecent = (product: Item) => {
    const itemIndex = recentItems.findIndex(
      (item: Item) =>
        item.id === product.id &&
        item.slug === product.slug &&
        item.name === product.name &&
        item.price === product.price &&
        item.thumbnail === product.main_img
    );

    if (itemIndex !== -1) {
      const newRecentItems = [...recentItems];
      newRecentItems[itemIndex].quantity++;
      setRecentItems(newRecentItems);
    } else {
      setRecentItems([
        ...recentItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          thumbnail: product.main_img,
        },
      ]);
    }
  };

  const addToWishlist = (product: Item) => {
    const isItemInWishlist = wishlistItems.some(
      (item: Item) => String(item.id) === String(product.id)
    );

    if (isItemInWishlist) {
      const newWishlistItems = wishlistItems.filter(
        (item: Item) => String(item.id) !== String(product.id)
      );
      setWishlistItems(newWishlistItems);
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  return {
    recentItems,
    addToRecent,
    wishlistItems,
    addToWishlist,
  };
};
