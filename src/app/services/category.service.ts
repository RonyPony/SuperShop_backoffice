import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  // apiUrl = "https://localhost:7018/";
  apiUrl = "https://super-shop-api.herokuapp.com/";

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}api/Category/All`);
  }
}
