import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { Order } from "src/app/models/order";
import { Result } from "src/app/models/loginResponse";
import Swal from "sweetalert2";
import { HtmlParser } from "@angular/compiler";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AccountInfo, AccountInfoResponse } from "src/app/models/accountInfo";
import { MallService } from "src/app/services/mall.service";
import { Mall } from "src/app/models/mall";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private auth: AuthenticationService,
    private mallServ: MallService
  ) {}
  _orders!: Order[];
  _users!: AccountInfo[];
  _malls!: Mall[];
  ngOnInit(): void {
    this.loadOrders();
    this.loadUsers();
    this.loadMalls();
  }

  getUserName(userId: String) {
    if (this._users) {
      return this._users.find((x) => x.id == userId)?.name;
    } else {
      return userId;
    }
  }

  loadMalls() {
    this.mallServ.getAllMalls().subscribe((tt) => {
      var result = tt as Mall[];
      this._malls = result;
      console.log("Malls", this._malls);
    });
  }

  loadUsers() {
    this.auth.getUsers().subscribe((tt) => {
      var result = tt as AccountInfoResponse;
      console.log("Userz", result);
      this._users = result.data;
    });
  }

  seeDetails(order: Order) {
    Swal.fire({
      title: "<strong>DETALLES DE LA ORDEN</strong>",
      icon: "info",
      html:
        "<b>Identificador de la orden</b> " +
        order.id +
        "<hr>" +
        "<b>Direccion de la orden</b> " +
        order.address +
        "<hr>" +
        "<img src='" +
        order.branch.imageUrl +
        "' height=50><br><br>" +
        "<b>Tienda</b> " +
        order.branch.name +
        "<hr>" +
        "<b>Mall </b>" +
        this._malls.find((x) => x.id == order.branch.mallId)?.name +
        "" +
        "<hr>" +
        "<b>Completada</b> " +
        order.completed +
        "<hr>" +
        "<b>Fecha de creacion de la orden</b> " +
        order.createdAt +
        "<hr>" +
        "<b>Cantidad de Productos</b> " +
        order.products.length +
        "<hr>" +
        "<b>Total</b> " +
        order.total +
        "<hr>" +
        "<b>Total Impuesto</b> " +
        order.totalTax +
        "<hr>" +
        "<b>Total sin impuestos</b> " +
        order.totalWhitoutTaxes +
        "<hr>" +
        "<b>Usuario</b> " +
        this._users.find((x) => x.id == order.userId)?.name +
        // "<br><a href='/listProduct/'><button class='btn btn-primary'>Ver Productos</button></a>" +
        "<hr>",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
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
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      const result = response as Order[];
      this._orders = result;
      console.log("ordenes", result);
    });
  }
}
