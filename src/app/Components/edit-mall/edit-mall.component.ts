import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import { MallService } from "src/app/services/mall.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-mall",
  templateUrl: "./edit-mall.component.html",
  styleUrls: ["./edit-mall.component.scss"],
})
export class EditMallComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
  });

  branchesForm: FormGroup = new FormGroup({
    branchId: new FormControl(""),
  });
  errorMessage!: String;
  id: string | null | undefined;
  _currentMall!: Mall;
  _categories!: Category[];
  _toRemoveStoresId: String[] = [];
  _finalStores: Branch[] = [];
  registerRequest!: Mall;
  _stores: Branch[] = [];
  constructor(
    private route: ActivatedRoute,
    private mallService: MallService,
    private categoryService: CategoryService,
    private storeService: BranchService
  ) {}

  getCategory(catId: String) {
    if (this._categories) {
      return this._categories.find((x) => x.id == catId)?.name;
    } else {
      return catId;
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.fillCategories();
    if (this.id != undefined) {
      this.mallService.getMallById(this.id).subscribe((ii) => {
        var response = ii as Mall;
        this._currentMall = response;
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

  loadStores() {
    this.storeService.getAllBranches().subscribe((response) => {
      var resp = response as unknown as Branch[];
      this._stores = resp;
      console.log("Stores", response);
    });
  }

  applyChanges() {
    this._toRemoveStoresId.forEach((value) => {
      this._finalStores = this._currentMall.branches!.filter(
        (obj) => obj.id !== value
      );
    });
    if (this._finalStores == undefined) {
      this._finalStores != this._currentMall.branches;
    }
    console.log("Stores a grabar", this._finalStores);

    this.registerRequest = {
      id: this._currentMall.id,
      name: this.registerForm.get("nombre")?.value,
      branches: this._finalStores,
      coordinates: { lat: 0, long: 0 },
      imageUrl: this.registerForm.get("imageUrl")?.value,
    };
    if (
      this.registerRequest.name == "" ||
      this.registerRequest.imageUrl == ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "complete todos los campos",
        showConfirmButton: false,
        timer: 1800,
      });
      return;
    }
    console.log("Mall a grabar", this.registerRequest);
    this.mallService.updateMall(this.registerRequest).subscribe((response) => {
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
            "Ha ocurrido un error al intentar crear el mall " +
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

  fillCategories() {
    this.categoryService.getAllCategories().subscribe((dd) => {
      var kat = dd as Category[];
      this._categories = kat;
    });
  }
  update() {}
}
