import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  allProducts!: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      var resp = response as unknown as Product[];
      this.allProducts = response as unknown as Product[];
      console.log(response);
    });
  }
}
