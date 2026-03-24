export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isPromoted: boolean;
  createdAt: string;
}

export type ProductCategory =
  | "keyboards"
  | "mice"
  | "headsets"
  | "controllers"
  | "accessories"
  | "computers"
  | "chairs";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "keyboards", label: "Keyboards" },
  { value: "mice", label: "Mice" },
  { value: "headsets", label: "Headsets" },
  { value: "controllers", label: "Controllers" },
  { value: "computers", label: "Computers" },
  { value: "chairs", label: "Chairs" },
  { value: "accessories", label: "Accessories" },
];

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  _id: string;
  products: IOrderProduct[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  paymentStatus: "pending" | "completed" | "failed";
  paypalOrderId?: string;
  createdAt: string;
}
