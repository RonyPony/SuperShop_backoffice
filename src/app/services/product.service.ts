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
    return this.http.get<Product[]>(`${this.apiUrl}api/Mall/All`);
  }
}
