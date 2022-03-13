import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../models/loginRequest";
import { RegisterRequest } from "../models/registerRequest";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  // apiUrl = 'https://super-shop-api.herokuapp.com/';
  apiUrl = "https://localhost:7018/";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}api/auth/UserAuth/users`);
  }

  login(request: LoginRequest) {
    return this.http.post(`${this.apiUrl}api/auth/UserAuth/login`, request);
  }

  registerAccount(request: RegisterRequest) {
    console.log("email => " + request.email);
    console.log("name => " + request.name);
    console.log("lastName =>" + request.lastName);
    console.log("pass => " + request.password);
    console.log("user => " + request.userName);

    return this.http.post(
      `${this.apiUrl}api/auth/UserAuth/register/admin`,
      request
    );
  }
}
