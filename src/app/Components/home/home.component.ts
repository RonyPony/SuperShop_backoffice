import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panic: number = 0;
  allReports: number = 0;
  completed: number = 0;
  allUsers: number = 0;
  authorities: number = 0;
  allImages: number = 0;
  constructor(private reportService: ReportsService, private userService: UserService, private imageService: ImageService) { }

  ngOnInit() {
    this.countPanic();
    this.countCompleted();
    this.countAll();
    this.countUsers();
    this.countAuthorities();
    this.countImages();
  }
  countUsers() {
    this.userService.getAllUsers().subscribe(all => {
      this.allUsers = all.length;
    })
  }

  countImages() {
    this.imageService.getAllImages().subscribe(todas => {
      this.allImages = todas.length;
      console.log(this.allImages)
    })
  }

  countAuthorities() {
    this.userService.getAllUsers().subscribe(all => {
      all.forEach(user => {

        if (user.role == "Authority") {
          this.authorities++;
        }
      })
    })
  }

  countAll() {
    this.reportService.getReports().subscribe(reports => {

      this.allReports = reports.length + this.panic;

    })
  }
  countCompleted() {
    this.reportService.getReports().subscribe(reports => {
      reports.forEach(kk => {
        if (kk.isCompleted == true) {
          this.completed++;
        }
      })
    })
  }
  countPanic() {
    this.reportService.getAllPanicReports().subscribe(reports => {
      this.panic = reports.length;
    })
  }

}
