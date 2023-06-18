import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
// import { createAtom } from 'nanostores';



// Create a Nanostores atom to manage the recent products list
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

// Export the recent products atom
// export default recentProductsAtom;

export type Item = {
  id: number;
  quantity: number;
  name: string;
  slug?: string;
  thumbnail?: string;
  main_img?: string;
  price?: string;
};

export const useRecentView = () => {
  if (typeof window === "undefined") {
    return {
      addToRecent: () => null,
      recentItems: [],
    };
  }
  const recentStore = useStore(recentProductsAtom);
  const wishlistStore = useStore(wishlistItemsAtom);

  const addToRecent = (product: Item) => {
    const itemIndex = recentStore.findIndex(
      (item: Item) =>
        item.id === product.id &&
        item.slug === product.slug &&
        item.name === product.name &&
        item.price === product.price &&
        item.thumbnail === product.main_img
    );

    if (itemIndex !== -1) {
      const newRecentItems = [...recentStore];
      newRecentItems[itemIndex].quantity++;
      recentProductsAtom.set(newRecentItems);
    } else {
      recentProductsAtom.set([
        ...recentStore,
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
    const isItemInWishlist = wishlistStore.some(
      (item: Item) => item.id === product.id
    );

    if (isItemInWishlist) {
      // Item already exists in wishlist, remove it
      const newWishlistItems = wishlistStore.filter(
        (item: Item) => item.id !== product.id
      );
      wishlistItemsAtom.set(newWishlistItems);
    } else {
      // Item is not in wishlist, add it
      wishlistItemsAtom.set([...wishlistStore, product]);
    }
  };

  return {
    recentItems: recentStore ?? [],
    addToRecent,
    wishlistItems: wishlistStore ?? [],
    addToWishlist,
  };
};

export default useRecentView;
