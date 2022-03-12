import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userReports',
  templateUrl: './userReports.component.html',
  styleUrls: ['./userReports.component.scss']
})
export class UserReportsComponent implements OnInit {
  allReports: Report[] | undefined
  userId: string = ''
  userName: string = '[Cargando...] '
  constructor(private reportService: ReportsService, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadUserId();

    this.loadReports();
    this.loadUserName();
  }

  loadUserName() {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userName = user.name;
    })
  }

  loadReports() {
    this.reportService.getUserReports(this.userId).subscribe(reports => {
      this.allReports = reports;
    })
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

  loadUserId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.userId = paramsId.id;
      console.log(this.userId)
    })
  }
}
