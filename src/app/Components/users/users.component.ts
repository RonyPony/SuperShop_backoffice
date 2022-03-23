import { Component, OnInit } from "@angular/core";
import { AccountInfo, AccountInfoResponse } from "src/app/models/accountInfo";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  allUsers!: AccountInfoResponse;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  deleteUser(user: String) {
    this.authService.deleteUser(user).subscribe((response) => {
      var resp = response as AccountInfoResponse;
      console.log(resp);
      if (resp.isSuccess) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario Eliminado Correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No se pudo eliminar el usuario, intentalo luego",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      var resp = response as unknown as AccountInfoResponse;
      this.allUsers = response as unknown as AccountInfoResponse;
      console.log(response);
    });
  }
}
