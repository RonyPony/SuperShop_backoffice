import { Component, OnInit } from '@angular/core';
import { AccountInfo } from 'src/app/models/accountInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers: AccountInfo[] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(response => {
      this.allUsers = response;
    });
  }

}
