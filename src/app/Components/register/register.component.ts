import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginResponse } from "src/app/models/loginResponse";
import { RegisterRequest } from "src/app/models/registerRequest";
import { AuthenticationService } from "src/app/services/authentication.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerAccountRequest: RegisterRequest | undefined;

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(""),
    name: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    phoneNumber: new FormControl(""),
    country: new FormControl(""),
    location: new FormControl(""),
    province: new FormControl(""),
    textDirection: new FormControl(""),
    zipCode: new FormControl(""),
    sector: new FormControl(""),
    role: new FormControl(""),
    registerDate: new FormControl(""),
    bornDate: new FormControl(""),
  });
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  registerAccount() {
    this.registerAccountRequest = {
      name: this.registerForm.get("name")?.value,
      lastName: this.registerForm.get("lastname")?.value,
      userName: this.registerForm.get("userName")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
    };
    // console.log(this.registerAccountRequest);

    if (
      this.registerAccountRequest.name != "" &&
      this.registerAccountRequest.lastName != "" &&
      this.registerAccountRequest.userName != "" &&
      this.registerAccountRequest.email != "" &&
      this.registerAccountRequest.password != ""
    ) {
      this.authenticationService
        .registerAccount(this.registerAccountRequest)
        .subscribe((response) => {
          var resp = response as LoginResponse;
          console.log(response[]);
          if (resp.result.isSuccess) {
            localStorage.setItem("currentUser", JSON.stringify(response));
            this.router.navigate(["/home"]);
          } else {
            Swal.fire(
              "Ups!",
              "Infomacion incorrecta, por favor intentalo otra vez",
              "error"
            );
          }
        });
    } else {
      Swal.fire(
        "Hey!",
        "Necesitamos saber un poco mas sobre ti, por favor intentalo otra vez",
        "warning"
      );
    }
  }
}
