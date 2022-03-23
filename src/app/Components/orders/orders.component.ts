import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { Order } from "src/app/models/order";
import { Result } from "src/app/models/loginResponse";
import Swal from "sweetalert2";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrdersService) {}
  _orders!: Order[];
  ngOnInit(): void {
    this.loadOrders();
  }
  deleteorder(order: Order) {
    this.orderService.deleteOrder(order).subscribe((response) => {
      const result = response as Result;
      if (result.isSuccess) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Orden Eliminada",
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error Eliminando orden",
          showConfirmButton: false,
          timer: 1800,
        });
      }
      console.log("ordenes", result);
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      const result = response as Order[];
      this._orders = result;
      console.log("ordenes", result);
    });
  }
}
