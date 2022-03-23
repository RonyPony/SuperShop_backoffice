import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../models/loginRequest";
import { RegisterRequest } from "../models/registerRequest";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  apiUrl = "https://super-shop-api.herokuapp.com/";
  // apiUrl = "https://localhost:7018/";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}api/auth/UserAuth/users`);
  }

  getUserByEmail(email: string) {
    return this.http.get(`${this.apiUrl}api/auth/UserAuth/user/` + email);
  }

  login(request: LoginRequest) {
    return this.http.post(`${this.apiUrl}api/auth/UserAuth/login`, request);
  }

  deleteUser(userId: String) {
    return this.http.delete(`${this.apiUrl}api/auth/UserAuth/remove/` + userId);
  }

  registerAccount(request: RegisterRequest) {
    return this.http.post(
      `${this.apiUrl}api/auth/UserAuth/register/admin`,
      request
    );
  }
}
