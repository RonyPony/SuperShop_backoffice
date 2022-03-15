import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BranchService {
  // apiUrl = "https://localhost:7018/";
  apiUrl = "https://super-shop-api.herokuapp.com/";
  constructor(private http: HttpClient) {}

  getAllBranches() {
    return this.http.get(`${this.apiUrl}api/Branch/All`);
  }

  getCategoryById(catId: string) {
    return this.http.get(`${this.apiUrl}api/Category/` + catId);
  }
}
