import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { CategoryService } from "src/app/services/category.service";
import { BranchService } from "src/app/services/branch.service";
import Swal from "sweetalert2";
import { MallService } from "src/app/services/mall.service";
import { Mall } from "src/app/models/mall";

@Component({
  selector: "app-edit-tienda",
  templateUrl: "./edit-tienda.component.html",
  styleUrls: ["./edit-tienda.component.scss"],
})
export class EditTiendaComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
    categoryId: new FormControl(""),
    mallId: new FormControl(""),
  });

  branchesForm: FormGroup = new FormGroup({
    branchId: new FormControl(""),
  });
  errorMessage!: String;
  id: string | null | undefined;
  _currentTienda!: Branch;
  _categories!: Category[];
  _malls!: Mall[];
  _toRemoveStoresId: String[] = [];
  _finalStores: Branch[] = [];
  registerRequest!: Branch;
  _stores: Branch[] = [];
  constructor(
    private route: ActivatedRoute,
    private TiendaService: BranchService,
    private categoryService: CategoryService,
    private storeService: BranchService,
    private mallService: MallService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.fillCategories();
    if (this.id != undefined) {
      this.TiendaService.getBranchById(this.id).subscribe((ii) => {
        var response = ii as Branch;
        this._currentTienda = response;
      });
    }
    this.loadMalls();
  }

  addSelectedStore() {
    var newStoreId = this.branchesForm.get("branchId")?.value;
    var newStore = this._stores.find((x) => x.id == newStoreId);
    // console.log("agregando " + newStore!.name);
    this._finalStores.push(newStore!);
    Swal.fire(
      "Guardar",
      "Se agregara " +
        // newStore?.name +
        " a este Tienda, preciona actualizar para completar los cambios",
      "info"
    );
  }

  loadMalls() {
    this.mallService.getAllMalls().subscribe((response) => {
      var resp = response as unknown as Mall[];
      this._malls = resp;
      console.log("Malls", response);
    });
  }

  applyChanges() {
    this.registerRequest = {
      id: this._currentTienda.id,
      name: this.registerForm.get("nombre")?.value
        ? this.registerForm.get("nombre")?.value
        : this._currentTienda.name,
      imageUrl: this.registerForm.get("imageUrl")?.value
        ? this.registerForm.get("imageUrl")?.value
        : this._currentTienda.imageUrl,
      categoryId: this.registerForm.get("categoryId")?.value
        ? this.registerForm.get("categoryId")?.value
        : this._currentTienda.categoryId,
      mallId: this.registerForm.get("mallId")?.value
        ? this.registerForm.get("mallId")?.value
        : this._currentTienda.mallId,
    };
    if (this.registerRequest.categoryId == "") {
      this.registerRequest.categoryId == this._currentTienda.categoryId;
    }
    if (this.registerRequest.mallId == "") {
      this.registerRequest.mallId == this._currentTienda.mallId;
    }
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
    console.log("Tienda a grabar", this.registerRequest);
    this.TiendaService.updateBranch(this.registerRequest).subscribe(
      (response) => {
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
              "Ha ocurrido un error al intentar actualizar la Tienda " +
              this.registerRequest.name +
              ". por favor intentelo otra vez ",
            showConfirmButton: true,
            // timer: 1800,
          });
        }
      }
    );
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
      console.log("Categories", kat);
      this._categories = kat;
    });
  }
  update() {}

  getCategory(catId: String) {
    if (this._categories) {
      return this._categories.find((x) => x.id == catId)?.name;
    } else {
      return catId;
    }
  }

  getMall(mallId: String) {
    if (this._categories) {
      return this._malls.find((x) => x.id == mallId)?.name;
    } else {
      return mallId;
    }
  }
}
