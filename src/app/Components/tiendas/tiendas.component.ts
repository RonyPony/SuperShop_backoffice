import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/models/branch";
import { Category } from "src/app/models/category";
import { BranchService } from "src/app/services/branch.service";

@Component({
  selector: "app-tiendas",
  templateUrl: "./tiendas.component.html",
  styleUrls: ["./tiendas.component.scss"],
})
export class TiendasComponent implements OnInit {
  allBranches!: Branch[];
  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();
    this.syncCategories();
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
