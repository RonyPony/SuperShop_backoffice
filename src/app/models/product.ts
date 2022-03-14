export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  code: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  branchId: string;
}
