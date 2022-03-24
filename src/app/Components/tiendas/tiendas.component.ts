import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import { MallService } from "src/app/services/mall.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-tiendas",
  templateUrl: "./tiendas.component.html",
  styleUrls: ["./tiendas.component.scss"],
})
export class TiendasComponent implements OnInit {
  allBranches!: Branch[];
  allCategories!: Category[];
  _malls!: Mall[];
  constructor(
    private branchService: BranchService,
    private categoryService: CategoryService,
    private mallServ: MallService
  ) {}

  ngOnInit(): void {
    this.loadMalls();
    this.loadBranches();
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((gg) => {
      var tt = gg as Category[];
      console.log("Categorias", tt);
      this.allCategories = tt;
    });
  }

  deleteTienda(store: Branch) {
    Swal.fire({
      title: "Seguro quieres eliminar la tienda " + store.name + " ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.branchService.deleteBranch(store).subscribe((response) => {
          var result = response as Result;
          console.log(result);
          if (result.isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Tienda Eliminada",
              showConfirmButton: false,
              timer: 1800,
            });
            this.loadBranches();
          } else {
            Swal.fire("No se elimino la tienda", "", "info");
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire("No se elimino la tienda", "", "info");
      }
    });
  }

  async getString() {
    Swal.fire({
      title: "Nombre de la tienda",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        return name;
      },
    });
  }
  getMallName(mallId: String) {
    if (this._malls) {
      return this._malls.find((x) => x.id == mallId)?.name;
    } else {
      return mallId;
    }
  }

  loadMalls() {
    this.mallServ.getAllMalls().subscribe((tt) => {
      var result = tt as Mall[];
      this._malls = result;
      console.log("Malls", this._malls);
    });
  }

  getCategoryName(catId: String) {
    if (this.allCategories) {
      return this.allCategories.find((x) => x.id == catId)?.name;
    } else {
      return catId;
    }
  }

  sendStoreInfo(store: Branch) {
    this.branchService.createBranch(store).subscribe((response) => {
      var result = response as Result;
      if (!result.isSuccess) {
        Swal.showValidationMessage(`Request failed`);
        this.loadBranches();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Categoria Guardada",
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadBranches();
      }
    });
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe((response) => {
      var resp = response as unknown as Branch[];
      this.allBranches = response as unknown as Branch[];
      console.log(response);
    });
  }
}
