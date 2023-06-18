import { API_ENDPOINT } from "~/config";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    total_products: number;
    total_pages: number;
  };
}

export async function getExtraProducts(
  categorySlug: string,
  count: number = 5
): Promise<Product[]> {
  const url: string = `${API_ENDPOINT}/category.php`;
  const data: any = {
    category: categorySlug,
    products_per_page: count,
    page_number: 1,
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
    const products: Product[] = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
