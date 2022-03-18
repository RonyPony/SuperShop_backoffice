import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Branch } from "../models/branch";

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

  deleteBranch(tienda: Branch) {
    return this.http.delete(`${this.apiUrl}api/Branch/remove/` + tienda.id);
  }

  createBranch(request: Branch) {
    console.log(request);
    return this.http.post(`${this.apiUrl}api/Branch/save`, request);
  }

  getCategoryById(catId: string) {
    return this.http.get(`${this.apiUrl}api/Category/` + catId);
  }
}
