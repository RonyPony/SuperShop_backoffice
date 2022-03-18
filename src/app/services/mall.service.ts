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

  getAllMalls() {
    return this.http.get<Mall[]>(`${this.apiUrl}api/Mall/All`);
  }

  createMall(mall: Mall) {
    return this.http.post(`${this.apiUrl}api/Mall/Save`, {
      name: mall.name,
      coordinates: {
        lat: mall.coordinates.lat,
        long: mall.coordinates.long,
      },
      imageUrl: mall.imageUrl,
    });
  }

  deleteMall(mall: Mall) {
    return this.http.delete(`${this.apiUrl}api/Mall/remove/` + mall.id);
  }

  getMallById(mallId: String) {
    return this.http.get<Mall>(`${this.apiUrl}api/Mall/` + mallId);
  }
}
