import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { RegisterRequest } from '../models/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = 'https://bsite.net/ronytuquizz/api'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}/accounts`);
  }

  login(request: LoginRequest) {
    return this.http.post(`${this.apiUrl}/accounts/login`, request);
  }

  registerAccount(request: RegisterRequest) {
    console.log('email => ' + request.email)
    console.log('born => ' + request.bornDate)
    console.log('name => ' + request.name)
    console.log('pass => ' + request.password)
    console.log('registerDate => ' + request.registerDate)
    console.log('role => ' + request.role)
    console.log('user => ' + request.userName)

    return this.http.post(`${this.apiUrl}/accounts`, request);
  }

}
