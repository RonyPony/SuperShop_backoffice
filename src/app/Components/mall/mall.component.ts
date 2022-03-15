import { Component, OnInit } from "@angular/core";
import { Mall } from "src/app/models/mall";
import { MallService } from "src/app/services/mall.service";

@Component({
  selector: "app-mall",
  templateUrl: "./mall.component.html",
  styleUrls: ["./mall.component.scss"],
})
export class MallComponent implements OnInit {
  allMalls!: Mall[];
  constructor(private mallService: MallService) {}

  ngOnInit(): void {
    this.loadMalls();
  }

  loadMalls() {
    this.mallService.getAllMalls().subscribe((response) => {
      var resp = response as unknown as Mall[];
      this.allMalls = response as unknown as Mall[];
      console.log(response);
    });
  }
}
