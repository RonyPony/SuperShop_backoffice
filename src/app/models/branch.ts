import { Product } from "./product";

export interface Branch {
  id?: string;
  tmpCategoryName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  imageUrl: string;
  categoryId: string;
  mallId: string;
  products?: Product[];
}
