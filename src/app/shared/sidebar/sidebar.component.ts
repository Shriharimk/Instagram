import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../../new-post/new-post.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/class/user';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  userId: string= '';
  profileUser: User = new User();
  sub5: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  inProfilePage: boolean = false;

  constructor(
              private _snackBar: MatSnackBar,
              private profileService: ProfileService,
              private auth : AuthService,
              private dialog: MatDialog,
              private router: Router, 
              private route: ActivatedRoute){}

  ngOnInit(){
    this.userId=this.auth.userId;
    console.log('user id from auth = '+this.userId);
    const currentUrl = this.route.snapshot.url.map(segment => segment.path).join('/');

    // Check if the user is already on the 'profiles' page
    this.profileService.profilePageLoaded.subscribe((respone) =>{
      console.log(respone);
      this.inProfilePage=respone;
    })

    this.loadUserProfile(this.userId);
  }
  loadUserProfile(uid: string) {
    console.log('Loading profile');
    console.log(this.profileUser.profileImage);
    
    this.sub5 = this.profileService.getUserProfile(uid).subscribe((data) => {
      this.profileUser=Object(data);
      if(this.profileUser.profileImage == undefined){
        this.openSnackBar();
      }
    }, () =>{
      alert('something went wrong in retrieveing user profile');
    });
  }
  openSnackBar() {
    this._snackBar.open('Setup Your Profile!!', 'Ok!', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  newPost(){
    console.log('Opening new post diaglog');
    this.dialog.open(NewPostComponent);
  }

  // navigateToProfile(userId: string) {
  //   console.log('userId to be navigated to from actual page: '+userId)
  //   this.router.navigate(['/profiles', userId]);
  // }
  navigateToProfile(userId: string) {
    const currentUrl = this.route.snapshot.url.map(segment => segment.path).join('/');

    // Check if the user is already on the 'profiles' page
    if (currentUrl.includes('/profiles')) {
      const updatedUrl = currentUrl.replace(/\/profiles\/.*$/, `/profiles/${userId}`);
      this.router.navigateByUrl(updatedUrl);
    } else {
      // Navigate to the 'profiles' page with the user ID
      this.router.navigate(['/profiles', userId]);
    }
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/landing']);
  }
  routeNext(routePath: string) {
    this.router.navigate([routePath]);
  }
}
