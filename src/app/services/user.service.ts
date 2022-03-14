import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountInfo } from "../models/accountInfo";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl = "https://localhost:7018/";
  constructor(private http: HttpClient) {}

  getUserById(userId: string) {
    return this.http.get<AccountInfo>(`${this.apiUrl}/accounts/${userId}`);
  }
  getAllUsers() {
    return this.http.get<AccountInfo[]>(
      `${this.apiUrl}api/auth/UserAuth/users`
    );
  }
}
