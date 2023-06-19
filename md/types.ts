export type ProductData = {
  id: number;
  slug: string;
  name: string;
  price: string;
  is_on_sale: boolean;
  regular_price: string;
  main_image: string;
  main_image_small: string;
  sale_price: string;
  thumbnail: string;
  category: string;
  type: string;
};

export type ErrorResponse = {
  status: string;
  msg: string;
};

export type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (value: number, currency: string) => string;
};
