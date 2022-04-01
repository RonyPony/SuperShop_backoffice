import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  // apiUrl = "https://localhost:7018/";
  apiUrl = "https://super-shop-api.herokuapp.com/";
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}api/Product/All`);
  }

  createProduct(prod: Product) {
    return this.http.post(`${this.apiUrl}api/Product/save`, {
      name: prod.name,
      code: prod.code,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      imageUrl: prod.imageUrl,
      branchId: prod.branchId,
    });
  }

  updateProduct(prod: Product) {
    return this.http.put(`${this.apiUrl}api/Product/update`, {
      name: prod.name,
      code: prod.code,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      imageUrl: prod.imageUrl,
      branchId: prod.branchId,
      id: prod.id,
    });
  }
  getProductById(prod: String) {
    return this.http.get(`${this.apiUrl}api/Product/` + prod);
  }

  deleteProduct(productId?: String) {
    return this.http.delete(`${this.apiUrl}api/Product/remove/` + productId);
  }
}
