import { NullTemplateVisitor } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Mall } from "src/app/models/mall";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import { MallService } from "src/app/services/mall.service";

@Component({
  selector: "app-new-store",
  templateUrl: "./new-store.component.html",
  styleUrls: ["./new-store.component.scss"],
})
export class NewStoreComponent implements OnInit {
  registerRequest!: Branch;
  constructor(
    private categories_service: CategoryService,
    private mall_service: MallService,
    private branchService: BranchService
  ) {}
  _categories!: Category[];
  _malls!: Mall[];
  registerForm: FormGroup = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imageUrl: new FormControl(""),
    categoryId: new FormControl("", Validators.required),
    mallId: new FormControl("", Validators.required),
    products: new FormControl(""),
  });
  errorMessage: String | undefined;
  // registerRequest: RegisterRequest | undefined;

  ngOnInit(): void {
    this.loadCategories();
    this.loadMalls();
  }
  loadCategories() {
    this.categories_service.getAllCategories().subscribe((response) => {
      var resp = response as unknown as Category[];
      this._categories = resp;
      console.log("categories", response);
    });
  }
  loadMalls() {
    this.mall_service.getAllMalls().subscribe((response) => {
      var resp = response as unknown as Mall[];
      this._malls = resp;
      console.log("malls", response);
    });
  }
  register() {
    this.registerRequest = {
      name: this.registerForm.get("nombre")?.value,
      imageUrl: this.registerForm.get("imageUrl")?.value,
      categoryId: this.registerForm.get("categoryId")?.value,
      mallId: this.registerForm.get("mall")?.value,
    };

    this.branchService
      .createBranch(this.registerRequest)
      .subscribe((response) => {
        console.log("saving...", response);
      });
  }
  async addBranch() {
    var branches: string = "";
    var name = prompt("Nombre de la tienda");
    var image = prompt("URL Logo de la tienda");
    var cat = prompt(branches);
    var tmpStore = { name: name, imageUrl: image } as Branch;
    console.log(tmpStore);
  }
}
