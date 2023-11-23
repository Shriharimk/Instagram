import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { map } from 'rxjs';
import { User } from 'src/app/class/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  matchingUsers: any[] = [];
  usersList: User[] = [];
  searchItem: string = '';




  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log('HEADER COMPONENT')
    this.getUsersList();

  }

  getUsersList() {
    console.log('Getting users list..')
    this.userService.getUsers().pipe(map((response: any) => {
      const users: User[] = [];

      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const localUser = response[key];
          localUser.userId = key;
          users.push(localUser); // Push the new user object to the array of users
        }
      }
      return users;
    })).subscribe((data) => {
      this.usersList = data;
    });
  }

  onSearchInputChange() {
    this.userService.getUsers().subscribe((res) => {
      this.matchingUsers = this.usersList.filter(user => user.username.toLocaleLowerCase().includes(this.searchItem.toLocaleLowerCase()));
    }, err => {
      if (this.matchingUsers.length <= 0) {
        alert('no matching users found')
      }
    });
  }

  navigateToProfile(userId: string) {
    this.router.navigate(['/profiles', userId]);
  }
}
