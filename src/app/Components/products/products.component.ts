import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/models/branch";
import { Result } from "src/app/models/loginResponse";
import { Product } from "src/app/models/product";
import { BranchService } from "src/app/services/branch.service";
import { ProductService } from "src/app/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  allProducts!: Product[];
  constructor(
    private productService: ProductService,
    private storeService: BranchService
  ) {}
  _stores!: Branch[];
  ngOnInit(): void {
    this.loadProducts();
  }

  getStoreName(storeId: String) {
    var store = this._stores.find((e) => e.id === storeId);
    console.log(store);
    return store?.name;
  }
  deleteProduct(prod: Product) {
    var id = prod.id;
    Swal.fire({
      title: "Seguro quieres eliminar el producto " + prod.name + " ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // this._service.deleteACategory(cat);
        this.productService.deleteProduct(id).subscribe((response) => {
          var result = response as Result;
          console.log(result.isSuccess);
          if (result.isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Producto Eliminado",
              showConfirmButton: false,
              timer: 1800,
            });
            this.loadProducts();
          } else {
            Swal.fire("No se elimino la categoria", "", "info");
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire("No se elimino el producto", "", "info");
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

  loadProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      var resp = response as unknown as Product[];
      this.allProducts = response as unknown as Product[];
      console.log(response);
    });
  }
}
