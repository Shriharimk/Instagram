import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { map } from 'rxjs';
import { User } from 'src/app/class/user';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  matchingUsers: any[] = [];
  usersList: User[] = [];
  searchItem: string = '';
  inProfilePgae: boolean = false;




  constructor(
              private userService: UserService, 
              private router: Router,
              private profileService : ProfileService) { }

  ngOnInit() {
    console.log('HEADER COMPONENT');
    this.profileService.profilePageLoaded.subscribe((response) =>{
      this.inProfilePgae = response;
    });
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

  navigate(){
    this.router.navigate(['/lazy'])
  }

  navigateToProfile(userId: string) {
    this.router.navigate(['/lazy/profiles', userId]);
  }
}
