import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "~/config";
import { trackAddToCart } from "~/fb-pixel";

export type CartItem = {
  id: number;
  quantity: number;
  size?: string;
  color?: string;
  slug?: string;
  thumbnail?: string;
  price?: string;
};

const shoppingCart = persistentAtom<CartItem[]>("cart", [], {
  listen: true,
  encode: JSON.stringify,
  decode: JSON.parse,
});

const isShoppingCartOpen = persistentAtom<boolean>(
  "isShoppingCartOpen",
  false,
  {
    listen: false,
    // defaultValue: false, // set the default value to false
    encode: (value) => String(value),
    decode: (value) =>
      value === null || value === undefined ? false : Boolean(value),
  }
);

const calculateTotalPrice = (cartItems: CartItem[]) => {
  let price = 0;
  cartItems.forEach((item) => {
    if (typeof item.price === 'string') {
      price += (parseFloat(item.price) || 0) * item.quantity;
    }
  });
  return price;
};


export const getCart = () => {
  console.log("called getCart 1");
  return new Promise((resolve, reject) => {
    const apiUrl = `${API_ENDPOINT}/cart/get.php`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      // credentials: "include",
      // credentials: 'same-origin',
      // credentials: "omit",
      // mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          // console.log("response get CART", response);
          return response.json();
        } else {
          throw new Error("Failed to update quantity in cart");
        }
      })
      .then((data) => {
        const { total, total_discount } = data;
        resolve({ total: parseFloat(total), total_discount });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const callAddToCart = (product: CartItem) => {
  const apiUrl = `${API_ENDPOINT}/cart/add.php`;
  const requestData = {
    product_id: product.id,
    qty: product.quantity ?? 1,
  };
  fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Connection: "keep-alive",
    },
    // credentials: "include",
    credentials: "same-origin",
    method: "POST",
    // mode: 'no-cors',
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        // debugger;
        console.log("called Add API success new");
        getCart();

        return response.json();
      } else {
        throw new Error("Failed to add item to cart");
      }
    })
    .then((data) => {
      // Handle the response data
      console.log("API response:", data);
      const { total, total_discount }: any = data;
    })
    .catch((error) => {
      // Handle network or parsing error
      console.error("Error:", error);
    });
};
const callRemoveItemCart = (itemId: number) => {
  const apiUrl = `${API_ENDPOINT}/cart/remove.php`;
  const requestData = {
    product_id: itemId,
  };
  fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Connection: "keep-alive",
    },
    // credentials: "include",
    credentials: "same-origin",
    method: "POST",
    // mode: 'no-cors',
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        // debugger;
        console.log("called remove API success");
        return response.json();
      } else {
        throw new Error("Failed to remove item to cart");
      }
    })
    .then((data) => {
      // Handle the response data
      console.log("API response:", data);
      const { total, total_discount }: any = data;
    })
    .catch((error) => {
      // Handle network or parsing error
      console.error("Error:", error);
    });
};
const setQty = (product: CartItem, qty: any) => {
  const apiUrl = `${API_ENDPOINT}/cart/setQty.php`;
  const requestData = {
    product_id: product.id,
    qty: qty,
  };
  fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Connection: "keep-alive",
    },
    // credentials: "include",
    method: "POST",
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("called setQty API success");
        return response.json();
      } else {
        throw new Error("Failed to update quantity in cart");
      }
    })
    .then((data) => {
      // Handle the response data
      console.log("API response setQty:", data);
      const { total, total_discount }: any = data;
    })
    .catch((error) => {
      // Handle network or parsing error
      console.error("Error:", error);
    });
};
const addCouponAPI = (couponCode: any) => {
  return new Promise((resolve, reject) => {
    const apiUrl = `${API_ENDPOINT}/cart/coupon.php`;
    const requestData = {
      coupon: couponCode,
    };
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Connection: "keep-alive",
      },
      // credentials: "include",
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Called coupon API success");
          return response.json();
        } else {
          throw new Error("Failed to update coupon in cart");
        }
      })
      .then((data) => {
        console.log("API response coupon:", data);
        resolve(data); // Resolve the promise with the response data
        const { total, total_discount }: any = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error); // Reject the promise with the error
      });
  });
};
export const useShoppingCart = () => {
  if (typeof window === "undefined") {
    return {
      getItemQuantity: () => null,
      cartQuantity: 0,
      cartQuantityTotal: 0,
      cartItems: [],
      isOpen: false,
      addToCart: () => null,
      decreaseCartQuantity: () => null,
      removeFromCart: () => null,
      openCart: () => null,
      closeCart: () => null,
      refreshCart: () => null,
      addCoupon: () => null,
      totalPrice: 0,
      totalAPI: 0,
      totalDiscountAPI: 0,
      resetCart: () => null,
    };
  }
  const cartStore = useStore(shoppingCart);
  const isOpen = useStore(isShoppingCartOpen, false);
  const [totalAPI, setTotalAPI] = useState(0);
  const [totalDiscountAPI, setTotalDiscountAPI] = useState(0);

  const resetCart = () => {
    console.log("resetCart");
    shoppingCart.set([]);
  };

  const addToCart = (product: CartItem) => {
    console.log("addingToCart");
    console.log("addingToCart", cartStore);
    // debugger;
    const itemIndex = cartStore.findIndex(
      (item) =>
        item.id === product.id &&
        item.slug === product.slug &&
        item.price === product.price &&
        item.thumbnail === product.thumbnail
    );

    if (itemIndex !== -1) {
      console.log("already exists");
      const newCartItems = [...cartStore];
      newCartItems[itemIndex].quantity++;
      shoppingCart.set(newCartItems);
      console.log("already exists", newCartItems[itemIndex].quantity);
      setQty(product, newCartItems[itemIndex].quantity);
      callAddToCart(product);
    } else {
      console.log("Not exists");
      shoppingCart.set([
        ...cartStore,
        {
          id: product.id,
          slug: product.slug,
          thumbnail: product.thumbnail,
          price: product.price,
          quantity: product.quantity ?? 1,
        },
      ]);
      console.log("before call API addingToCart", cartStore);
      callAddToCart(product);
    }
    return;
  };

  const decreaseCartQuantity = (product: CartItem) => {
    const itemIndex = cartStore.findIndex((item) => item.id === product.id);
    const qty =
      cartStore?.find((item) => item.id === product.id)?.quantity ?? 1;
    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      if (newCartItems[itemIndex].quantity <= 1) {
        return removeFromCart(product.id);
      } else {
        newCartItems[itemIndex].quantity--;
        shoppingCart.set(newCartItems);
        setQty(product, qty - 1);
        return;
      }
    }
  };

  const removeFromCart = (itemId: number) => {
    const itemIndex = cartStore.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      newCartItems.splice(itemIndex, 1);
      shoppingCart.set(newCartItems);
      console.log("removeFromCart");
      callRemoveItemCart(itemId);
    }
    return;
  };

  const getItemQuantity = (product: CartItem) => {
    return cartStore?.find((item) => item.id === product.id)?.quantity ?? 0;
  };

  const openCart = () => {
    console.log("Opening cart");
    isShoppingCartOpen.set(true);
  };

  const closeCart = () => {
    // console.log("closeCart cart");
    isShoppingCartOpen.set(false);
  };
  const refreshCart = () => {
    console.log("refresh cart new");
    console.log("refreshCart cartStore>", cartStore);
  };
  const addCoupon = (couponCode: any) => {
    console.log("addCoupon NEW", couponCode);
    return addCouponAPI(couponCode);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  // Call calculateTotalPrice when the component mounts
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartStore));
  }, [cartStore]);

  // useEffect(() => {
  //   getCart()
  //     .then(({ total, total_discount }) => {
  //       setTotalAPI(total);
  //       setTotalDiscountAPI(total_discount);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  return {
    getItemQuantity,
    cartQuantity: cartStore?.length ?? 0,
    // cartQuantity: 10,
    cartQuantityTotal:
      cartStore?.reduce((total, item) => total + item.quantity, 0) ?? 0,
    cartItems: cartStore ?? [],
    isOpen,
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    openCart,
    closeCart,
    refreshCart,
    addCoupon,
    totalPrice,
    totalAPI,
    totalDiscountAPI,
    resetCart,
  };
};

export default useShoppingCart;
