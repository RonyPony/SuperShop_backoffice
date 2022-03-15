import { Component, OnInit } from "@angular/core";
import { AccountInfo, AccountInfoResponse } from "src/app/models/accountInfo";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { Mall } from "src/app/models/mall";
import { Product } from "src/app/models/product";
import { BranchService } from "src/app/services/branch.service";
import { CategoryService } from "src/app/services/category.service";
import { ImageService } from "src/app/services/image.service";
import { MallService } from "src/app/services/mall.service";
import { ProductService } from "src/app/services/product.service";
import { ReportsService } from "src/app/services/reports.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser!: AccountInfo;
  tiendas: number = 0;
  productos: number = 0;
  malls: number = 0;
  users: number = 0;
  orders: number = 0;
  categories: number = 0;
  constructor(
    private branchStore: BranchService,
    private productService: ProductService,
    private mallService: MallService,
    private userService:UserService,
    private categorySerice:CategoryService
  ) {}

  ngOnInit() {
    var tmpUser =  localStorage.getItem('currentUser') as unknown as AccountInfoResponse
    // this.currentUser = tmpUser.data.find(e=>true)
    console.log(localStorage.getItem('currentUser'))
    this.countBranch();
    this.countProduct();
    this.countMalls();
    this.countUsers();
    this.countCategories();
  }
  countBranch() {
    this.branchStore.getAllBranches().subscribe((all) => {
      var list = all  as  Branch[];

      this.tiendas = list.length;
    });
  }
  countProduct() {
    this.productService.getAllProducts().subscribe((all) => {
      var list = all  as  Product[];

      this.productos = list.length;
    });
  }

  countMalls() {
    this.mallService.getAllMalls().subscribe((all) => {
      var list = all  as  Mall[];

      this.malls = list.length;
    });
  }

  countCategories() {
    this.categorySerice.getAllCategories().subscribe((all) => {
      var list = all  as  Category[];

      this.categories = list.length;
    });
  }

  countOrdrs() {
    // this.or.().subscribe((all) => {
    //   var list = all  as  Mall[];

    //   this.malls = list.length;
    // });
  }
  countUsers() {
    this.userService.getAllUsers().subscribe((all) => {
      var list = all as unknown as AccountInfoResponse;
      var x = list.data;
      this.users = x.length;
    });
  }

 
}
