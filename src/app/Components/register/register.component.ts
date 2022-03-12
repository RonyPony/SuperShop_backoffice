import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/registerRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerAccountRequest: RegisterRequest | undefined;

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
    country: new FormControl(''),
    location: new FormControl(''),
    province: new FormControl(''),
    textDirection: new FormControl(''),
    zipCode: new FormControl(''),
    sector: new FormControl(''),
    role: new FormControl(''),
    registerDate: new FormControl(''),
    bornDate: new FormControl('')
  });
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }


  registerAccount() {
    this.registerAccountRequest = {
      name: this.registerForm.get('nombre')?.value,
      role: this.registerForm.get('role')?.value,
      registerDate: new Date(),
      bornDate: this.registerForm.get('bornDate')?.value,
      userName: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('pawwsord')?.value,
    }
    console.log(this.registerAccountRequest);

    // this.authenticationService.registerAccount();
  }

}
