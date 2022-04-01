import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { Product } from "src/app/models/product";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import { MallService } from "src/app/services/mall.service";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
    codigo: new FormControl(""),
    descripcion: new FormControl(""),
    precio: new FormControl(""),
    cantidad: new FormControl(""),
    tienda: new FormControl(""),
  });

  branchesForm: FormGroup = new FormGroup({
    branchId: new FormControl(""),
  });
  errorMessage!: String;
  id: string | null | undefined;
  _currentProduct!: Product;
  _categories!: Category[];
  _toRemoveStoresId: String[] = [];
  _finalStores: Branch[] = [];
  registerRequest!: Product;
  _stores: Branch[] = [];
  constructor(
    private route: ActivatedRoute,
    private mallService: MallService,
    private categoryService: CategoryService,
    private storeService: BranchService,
    private prodSErvice: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.fillCategories();
    if (this.id != undefined) {
      this.prodSErvice.getProductById(this.id).subscribe((ii) => {
        var response = ii as Product;
        this._currentProduct = response;
      });
    }
    this.loadStores();
  }

  addSelectedStore() {
    var newStoreId = this.branchesForm.get("branchId")?.value;
    var newStore = this._stores.find((x) => x.id == newStoreId);
    console.log("agregando " + newStore!.name);
    this._finalStores.push(newStore!);
    Swal.fire(
      "Guardar",
      "Se agregara " +
        newStore?.name +
        " a este mall, preciona actualizar para completar los cambios",
      "info"
    );
  }

  getCategory(catId: String) {
    if (this._categories) {
      return "X";
    } else {
      return catId;
    }
  }

  loadStores() {
    this.storeService.getAllBranches().subscribe((response) => {
      var resp = response as unknown as Branch[];
      this._stores = resp;
      console.log("Stores", response);
    });
  }

  applyChanges() {
    this.registerRequest = {
      id: this._currentProduct.id,
      name: this.registerForm.get("nombre")?.value
        ? this.registerForm.get("nombre")?.value
        : this._currentProduct.name,
      imageUrl: this.registerForm.get("imageUrl")?.value
        ? this.registerForm.get("imageUrl")?.value
        : this._currentProduct.imageUrl,
      code: this.registerForm.get("codigo")?.value
        ? this.registerForm.get("codigo")?.value
        : this._currentProduct.code,
      description: this.registerForm.get("descripcion")?.value
        ? this.registerForm.get("descripcion")?.value
        : this._currentProduct.description,
      price: this.registerForm.get("precio")?.value
        ? this.registerForm.get("precio")?.value
        : this._currentProduct.price,
      stock: this.registerForm.get("cantidad")?.value
        ? this.registerForm.get("cantidad")?.value
        : this._currentProduct.stock,
      branchId: this.registerForm.get("tienda")?.value
        ? this.registerForm.get("tienda")?.value
        : this._currentProduct.branchId,
    };
    // if (
    //   this.registerRequest.name == "" ||
    //   this.registerRequest.imageUrl == ""
    // ) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: "complete todos los campos",
    //     showConfirmButton: false,
    //     timer: 1800,
    //   });
    //   return;
    // }
    console.log("Producto a grabar", this.registerRequest);
    this.prodSErvice
      .updateProduct(this.registerRequest)
      .subscribe((response) => {
        var finalResponse = response as Result;
        if (finalResponse.isSuccess) {
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              this.registerRequest.name + " ha sido actualizado correctamente",
            showConfirmButton: false,
            timer: 1800,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Ha ocurrido un error",
            text:
              "Ha ocurrido un error al intentar actualizar el mall " +
              this.registerRequest.name +
              ". por favor intentelo otra vez ",
            showConfirmButton: true,
            // timer: 1800,
          });
        }
      });
  }

  removeStore(tienda: String) {
    this._toRemoveStoresId.push(tienda);
    Swal.fire(
      "Guardar",
      "Se eliminara esta tienda, preciona actualizar para completar los cambios",
      "info"
    );
  }

  getStore(storeId: String) {
    if (this._categories) {
      return this._stores.find((x) => x.id == storeId)?.name;
    } else {
      return storeId;
    }
  }

  fillCategories() {
    this.categoryService.getAllCategories().subscribe((dd) => {
      var kat = dd as Category[];
      this._categories = kat;
    });
  }
  update() {}
}
