import { Component, OnInit } from "@angular/core";
import { Result } from "src/app/models/loginResponse";
import { Mall } from "src/app/models/mall";
import { MallService } from "src/app/services/mall.service";
import Swal from "sweetalert2";

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

  delete(mall: Mall) {
    Swal.fire({
      title: "Seguro quieres eliminar el mall " + mall.name + " ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        // this._service.deleteACategory(cat);
        this.mallService.deleteMall(mall).subscribe((response) => {
          var result = response as Result;
          console.log(result.isSuccess);
          if (result.isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Mall Eliminado",
              showConfirmButton: false,
              timer: 1800,
            });
            this.loadMalls();
          } else {
            Swal.fire("No se elimino el mall", "", "info");
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire("No se elimino el mall", "", "info");
      }
    });
  }

  loadMalls() {
    this.mallService.getAllMalls().subscribe((response) => {
      var resp = response as unknown as Mall[];
      this.allMalls = response as unknown as Mall[];
      console.log(response);
    });
  }
}
