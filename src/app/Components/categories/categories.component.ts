import { Component, ContentChildren, ElementRef, OnInit } from "@angular/core";
import { Category } from "src/app/models/category";
import { Result } from "src/app/models/loginResponse";
import { CategoryService } from "src/app/services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  _service!: CategoryService;
  _categories!: Category[];

  constructor(private myElement: ElementRef, serv: CategoryService) {
    this._service = serv;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  deleteCategory(cat: Category) {
    Swal.fire({
      title: "Seguro quieres eliminar la categoria " + cat.name + " ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // this._service.deleteACategory(cat);
        this._service.deleteACategory(cat).subscribe((response) => {
          var result = response as Result;
          console.log(result.isSuccess);
          if (result.isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Categoria Eliminada",
              showConfirmButton: false,
              timer: 1800,
            });
            this.loadCategories();
          } else {
            Swal.fire("No se elimino la categoria", "", "info");
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire("No se elimino la categoria", "", "info");
      }
    });
  }

  addCategory() {
    Swal.fire({
      title: "Nombre de la categoria",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        var catName = login;
        console.log(catName);
        this._service.saveCategory(catName).subscribe((response) => {
          var result = response as Result;
          if (!result.isSuccess) {
            Swal.showValidationMessage(`Request failed`);
            this.loadCategories();
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Categoria Guardada",
              showConfirmButton: false,
              timer: 1500,
            });
            this.loadCategories();
          }
        });
        // return fetch(`//api.github.com/users/${login}`)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error(response.statusText);
        //     }
        //     return response.json();
        //   })
        //   .catch((error) => {
        //     Swal.showValidationMessage(`Request failed: ${error}`);
        //   });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Cargando...`,
        });
      }
    });
    //   Swal.fire({
    //     title: "Nueva Categoria",
    //     html: `<input type="text" id="addForm" class="swal2-input" placeholder="Nombre de la categoria">`,
    //     confirmButtonText: "Guardar",
    //     focusConfirm: false,
    //     preConfirm: () => {
    //       const data = this.myElement.nativeElement.querySelector("#addForm");
    //       console.log(data);
    //       if (true) {
    //         Swal.showValidationMessage(`Please enter login and password`);
    //       }
    //       return null;
    //     },
    //   }).then((result) => {
    //     Swal.fire(
    //       `
    //   Login:
    //   Password:
    // `.trim()
    //     );
    //   });
  }

  loadCategories() {
    this._service.getAllCategories().subscribe((response) => {
      var resp = response as unknown as Category[];
      this._categories = resp;
      console.log(response);
    });
  }
}
