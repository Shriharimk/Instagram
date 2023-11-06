import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent {
  searchInput: string = '';
  userResults: any[] = [];

  constructor(private userService: UserService) {}

  onSearchInputChange(searchInput :  string) {
    this.userService.getUsers().subscribe((users) => {
      // Update the userResults with the search results
      this.userResults = users.filter((user) => user.username.includes(searchInput));
    });
  }

  selectUser(user: any) {
    // Implement the logic for selecting a user when a list item is clicked
    // You can use the 'user' object to perform any necessary actions.
  }
}
