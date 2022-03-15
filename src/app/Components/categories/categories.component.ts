import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  _service!: CategoryService;
  _categories!: Category[];
  constructor(serv: CategoryService) {
    this._service = serv;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._service.getAllCategories().subscribe((response) => {
      var resp = response as unknown as Category[];
      this._categories = resp;
      console.log(response);
    });
  }
}
