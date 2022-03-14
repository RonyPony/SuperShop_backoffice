import { Component, OnInit } from "@angular/core";
import { AccountInfo, AccountInfoResponse } from "src/app/models/accountInfo";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  allUsers!: AccountInfoResponse;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      var resp = response as unknown as AccountInfoResponse;
      this.allUsers = response as unknown as AccountInfoResponse;
      console.log(response);
    });
  }
}
