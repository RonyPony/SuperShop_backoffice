import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountInfo, AccountInfoResponse } from "src/app/models/accountInfo";
import { LoginRequest } from "src/app/models/loginRequest";
import { LoginResponse } from "src/app/models/loginResponse";
import { AuthenticationService } from "src/app/services/authentication.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest | undefined;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService
      .getUsers()
      .subscribe((response) => console.log(response));
  }

  register() {
    this.router.navigate(["/register"]);
  }

  login() {
    this.loginRequest = {
      userName: this.loginForm.get("email")?.value,
      rememberMe: true,
      password: this.loginForm.get("password")?.value,
    };
    this.authenticationService.login(this.loginRequest).subscribe(
      (response) => {
        var resp = response as LoginResponse;
        if (resp.result.isSuccess) {
          this.authenticationService.getUserByEmail(this.loginRequest!.userName).subscribe((response)=>{
            var resp= response as AccountInfoResponse;
            if (resp.isSuccess) {
              localStorage.setItem("currentUser", JSON.stringify(resp));
            this.router.navigate(["/home"]);
            }else{
              Swal.fire(
                "Hey!",
                "Infomacion correcta, pero no pudimos cargar tu informacion, favor comunicate con el administrador",
                "error"
              );
            }
          })
          
        } else {
          Swal.fire(
            "Ups!",
            "Infomacion incorrecta, por favor intentalo otra vez",
            "error"
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
