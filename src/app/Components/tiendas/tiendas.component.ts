import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-tiendas",
  templateUrl: "./tiendas.component.html",
  styleUrls: ["./tiendas.component.scss"],
})
export class TiendasComponent implements OnInit {
  allBranches!: Branch[];
  allCategories: Category[] = [];
  constructor(
    private branchService: BranchService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadBranches();
    this.syncCategories();
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe((gg) => {
      var tt = gg as Category[];
      console.log(tt);
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

  syncCategories() {
    this.allBranches.forEach((pp) => {
      // var tmpCatId = pp.categoryId;
      // this.branchService.getCategoryById(tmpCatId).subscribe((response) => {
      //   var resp = response as unknown as Category;
      //   console.log(response);
      //   pp.tmpCategoryName = resp.name;
      // });
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
