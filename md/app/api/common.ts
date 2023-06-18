import { API_ENDPOINT } from "~/config";

export async function getOrderInfo(orderID: number) {
  const url: string = `${API_ENDPOINT}/orderInfo.php`;
  const data: any = {
    order_id: orderID,
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
    const result = await response.json();
    console.log('result',result)
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
