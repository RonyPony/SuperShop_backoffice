import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Mall } from "src/app/models/mall";
@Injectable({
  providedIn: "root",
})
export class MallService {
  // apiUrl = "https://localhost:7018/";
  apiUrl = "https://super-shop-api.herokuapp.com/";
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Mall[]>(`${this.apiUrl}api/Mall/All`);
  }
}
