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

  deleteACategory(cat: Category) {
    return this.http.delete(`${this.apiUrl}api/Category/remove/` + cat.id);
  }

  saveCategory(categoryName: string) {
    console.log(categoryName);
    return this.http.post(`${this.apiUrl}api/Category/save`, {
      name: categoryName,
    });
  }

  updateCategory(categoryName: string, catId: String) {
    console.log(categoryName);
    return this.http.put(`${this.apiUrl}api/Category/update`, {
      id: catId,
      name: categoryName,
    });
  }
}
