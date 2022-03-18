import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { MallService } from "src/app/services/mall.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-new-mall",
  templateUrl: "./new-mall.component.html",
  styleUrls: ["./new-mall.component.scss"],
})
export class NewMallComponent implements OnInit {
  constructor(private mall_service: MallService) {}
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
  });
  errorMessage: String | undefined;
  registerRequest!: Mall;

  ngOnInit(): void {}

  register() {
    this.registerRequest = {
      name: this.registerForm.get("nombre")?.value,
      coordinates: { lat: 0, long: 0 },
      imageUrl: this.registerForm.get("imageUrl")?.value,
    };
    this.mall_service.createMall(this.registerRequest).subscribe((response) => {
      var finalResponse = response as Result;
      if (finalResponse.isSuccess) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: this.registerRequest.name + " ha sido creado correctamente",
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ha ocurrido un error",
          text:
            "Ha ocurrido un error al intentar crear el mall " +
            this.registerRequest.name +
            ". por favor intentelo otra vez ",
          showConfirmButton: true,
          // timer: 1800,
        });
      }
    });
  }
}
