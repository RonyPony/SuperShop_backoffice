import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';
import { ReportType } from "../../Enums/reportType.enum";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  Panicreports: Report[] = [];
  username: String = "";

  constructor(private reportService: ReportsService, private userService: UserService) { }

  ngOnInit() {
    this.reload();

  }

  reload() {
    this.loadPanicReports();
    this.loadReports()
  }


  loadReports() {
    this.reportService.getReports().subscribe(response => {
      this.reports = response;
    });
  }

  loadPanicReports() {
    this.reportService.getAllPanicReports().subscribe(response => {
      this.Panicreports = response;
    });
  }

  getLabel(id: number) {
    return (this.reportService.getTipoReport(id));
  }

  isAssignedLabel(yes: boolean) {
    if (yes) {
      return "Ya fue asignado";
    } else {
      return "No Asignada"
    }
  }
  yesOrNo(yes: boolean) {
    if (yes) {
      return "Si";
    } else {
      return "No"
    }
  }

  isCompletedLabel(yes: boolean) {
    if (yes) {
      return "Ya fue completada";
    } else {
      return "Aun sin completar"
    }
  }
  getUser(id: string) {
    this.userService.getUserById(id).subscribe(response => {
      this.username = response.name;
    })
  }

}
