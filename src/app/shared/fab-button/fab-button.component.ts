import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from 'src/app/new-post/new-post.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css']
})
export class FabButtonComponent {
  input1: string = "inp1";
  input2: string = "inp1";
  userId: string = '';
  user: User;


  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.userId = this.auth.userId;
    this.loadUserProfile();
  }

  loadUserProfile() {
    console.log('Loading profile');

    this.profileService.getUserProfile(this.userId).subscribe((data) => {
      this.user = Object(data);
    }, () => {
      alert('something went wrong in retrieveing user profile');
    });
  }

  navigateToProfile() {
    console.log('userId to be navigated to from actual page: ' + this.userId)
    this.router.navigate(['/profiles', this.userId]);
  }

  newPost() {
    console.log('Opening new post diaglog');
    this.dialog.open(NewPostComponent);
  }

  logout(){
    this.auth.logout();
  }
}
