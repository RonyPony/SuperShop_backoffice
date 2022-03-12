import { HttpErrorResponse } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/registerRequest';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html',
  styleUrls: ['./newUser.component.scss']
})
export class NewUserComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    userName: new FormControl(''),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    registerDate: new FormControl('', Validators.required),
    bornDate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })
  errorMessage: String | undefined
  registerRequest: RegisterRequest | undefined


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    this.registerRequest = {
      name: this.registerForm.get('nombre')?.value,
      role: this.registerForm.get('role')?.value,
      registerDate: new Date(),
      bornDate: this.registerForm.get('bornDate')?.value,
      userName: this.registerForm.get('userName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }

    if (this.registerRequest.userName.includes(" ")) {
      this.errorMessage = "Nombre de usuario invalido, no puede contener espacios, ni caracteres especiales"
    } else {
      if (this.registerRequest.password.length < 10) {
        this.errorMessage = "La clave debe tener mas de 10 caracteres"
      } else {
        if (this.registerRequest.name == "" || this.registerRequest.email == "" || this.registerRequest.userName == "" || this.registerRequest.password == "") {
          this.errorMessage = "Complete todos los campos";
        } else {
          this.authenticationService.registerAccount(
            this.registerRequest
          ).subscribe(response => {

            console.log(response);
          });
        }
      }
    }



  }

}
