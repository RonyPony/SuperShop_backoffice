import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Branch } from "src/app/models/branch";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { Product } from "src/app/models/product";
import { BranchService } from "src/app/services/branch.service";
import { MallService } from "src/app/services/mall.service";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
})
export class NewProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private storeService: BranchService,
    private mallService: MallService
  ) {}
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    codigo: new FormControl("", Validators.required),
    precio: new FormControl("", Validators.required),
    stock: new FormControl("", Validators.required),
    branchId: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
  });
  _stores!: Branch[];
  errorMessage: String | undefined;
  registerRequest!: Product;

  ngOnInit(): void {
    this.loadStores();
    console.log(this._stores);
  }

  getMall(tienda: Branch) {
    console.log("loading mall name");
    this.mallService.getMallById(tienda.mallId).subscribe((response) => {
      var resp = response as unknown as Mall;

      console.log("XXX", response);
    });
  }

  register() {
    this.registerRequest = {
      name: this.registerForm.get("nombre")?.value,
      imageUrl: this.registerForm.get("imageUrl")?.value,
      code: this.registerForm.get("codigo")?.value,
      price: this.registerForm.get("precio")?.value,
      stock: this.registerForm.get("stock")?.value,
      description: this.registerForm.get("descripcion")?.value,
      branchId: this.registerForm.get("branchId")?.value,
    };
    console.log(this.registerRequest);
    this.productService
      .createProduct(this.registerRequest)
      .subscribe((response) => {
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
              "Ha ocurrido un error al intentar crear el producto " +
              this.registerRequest.name +
              ". por favor intentelo otra vez " +
              "  | " +
              finalResponse.message,
            showConfirmButton: true,
            // timer: 1800,
          });
        }
      });
  }

  loadStores() {
    this.storeService.getAllBranches().subscribe((response) => {
      var resp = response as unknown as Branch[];
      this._stores = resp;
      console.log("Stores", response);
    });
  }
}
