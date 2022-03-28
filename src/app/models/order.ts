import { Branch } from "./branch";
import { Product } from "./product";

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  branchId: string;
  userId: string;
  products: Product[];
  address: string;
  total: number;
  totalWhitoutTaxes: number;
  transactionDetails: PaymentType;
  totalTax: number;
  completed: boolean;
  branch: Branch;
  productOrderDtos: ProductOrderDto[];
}

export interface PaymentType {
  paymentType: string;
}

export interface ProductOrderDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product: Product;
  orderId: string;
  order: string;
}
