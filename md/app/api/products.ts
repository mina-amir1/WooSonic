import { json } from "@remix-run/cloudflare";
import { API_ENDPOINT } from "~/config";
import { woo } from "~/lib/woocommerce";

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  image_small: string;
  category: string;
  // rating: string;
  // rate: string;
  // count: string;
};

export async function getProducts(name?: string | null) {
  // const response = await fetch('https://ay7aga.local/MitchAPI/category.php', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ "attributes": {}, "category": "bags", "price_range": [0, 1000], "products_per_page": 90, "page_number": 1 }),
  //   // headers: new Headers({
  //   //   "Authorization": `Basic ${btoa("survey:makeshift")}`
  //   // }),
  // })
  // if (response.ok) {
  //   return response;
  // }else{
  //   throw new Error(`Fetch failed with status ${response.status}`);
  // }
  // console.log('products>>>>>>>>>>>',response.json())
  // const products: Product[] = await response.json();
  // return products;
  const url = `${API_ENDPOINT}/category.php`;
  const data = {
    attributes: {},
    category: "dress",
    price_range: [0, 1000],
    products_per_page: 90,
    page_number: 1,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  // const response = await fetch(url, options);
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch data with status ${response.status}`);
  // }
  // const products: Product[] = await response.json();
  // return products;
  try {
    const response = await fetch(url, options);
    const result: ApiResponse = await response.json();
    // Extract the products array from the API response
    const products: Product[] = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// export async function getCategoryProducts(slug?: string | null){
//   const response = await fetch('https://honorable-nachos.localsite.io/MitchAPI/filter.php',{
//     method: 'Get',

//   })
//   const products: Product[products] = await response.json();
//   return {products};
// }

// export async function getProductBySlug(productSlug: string) {
//   // const response = await fetch(`https://dummyjson.com/products/${productSlug}`)

//   // try {
//   //   const response = await fetch(`https://127.0.0.1/MitchAPI/single.php`, {
//   //     method: 'POST',
//   //     body: JSON.stringify({ "slug": productSlug }),
//   //     // headers: new Headers({
//   //     //   "Authorization": `Basic ${btoa("survey:makeshift")}`
//   //     // }),
//   //   })
//   //   const jsonResponse = await response.json();
//   //   return {
//   //     ...jsonResponse as {},
//   //     // totalpages: response.headers['x-wp-totalpages'],
//   //     // wpTotal: response.headers['x-wp-total'],
//   //   }
//   // } catch (error) {
//   //   console.log("Response Status:", error.response.status);
//   //   console.log("Response Headers:", error.response.headers);
//   //   console.log("Response Data:", error.response.data);
//   // }
//   const url = 'https://127.0.0.1/MitchAPI/single.php';
//   const data = { "slug": productSlug };
//   const options = {
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     body: JSON.stringify(data),
//   };
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch data with status ${response.status}`);
//   }
//   const product: Product[] = await response.json();
//   return product;
// }
interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    // total_products: number;
    // total_pages: number;
  };
}

export async function getProductBySlug(
  productSlug: string
): Promise<Product[]> {
  const url: string = `${API_ENDPOINT}/single.php`;
  const data: any = {
    slug: productSlug,
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result: ApiResponse = await response.json();
    const product: Product[] = result;
    return product;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getNewFilterProducts(
  categorySlug: any,
  pageNumber: number,
  perPage: number,
  minPrice: number = 0,
  maxPrice: number = 1000000
): Promise<unknown> {
  const url: string = `${API_ENDPOINT}/filter.php`;
  const params = new URLSearchParams({
    category: categorySlug,
    price_range: `${minPrice},${maxPrice}`,
    products_per_page: perPage.toString(),
    page: pageNumber.toString(),
  });
  const apiUrl = `${url}?${params}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
