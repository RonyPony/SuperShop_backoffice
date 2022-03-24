import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../models/order";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  // apiUrl = "https://localhost:7018/";
  // apiUrl ="https://5000-ronypony-supershopmobile-ao0i4py39kx.ws-us38.gitpod.io/";
  apiUrl = "https://super-shop-api.herokuapp.com/";
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}api/Order/All`);
  }

  deleteOrder(order: Order) {
    var x = this.http.delete(`${this.apiUrl}api/Order/remove/${order.id}`);
    console.log(x);
    return x;
  }

  createOrder(request: Order) {
    console.log(request);
    return this.http.post(`${this.apiUrl}api/Order/save`, request);
  }

  getOrderById(orderId: string) {
    return this.http.get(`${this.apiUrl}api/Order/` + orderId);
  }
}
