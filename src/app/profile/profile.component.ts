// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { Posts } from '../class/posts';
import { User } from '../class/user';
import { PostService } from '../shared/post.service';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: Posts[] = [];
  post : Posts = new Posts();
  user : User = new User();
  userId :string = '';
  username : string = "";
  userPosts : Posts[]=[];
  recievedUser : User;
  rUid : string;
  authUid :string = '';
  check : boolean=false;
  isFetching : boolean = false;
 


  constructor(
    private auth:AuthService,
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router,
    private Route: ActivatedRoute,
    private dialog: MatDialog,
    ) {}
  

  ngOnInit() {
    //receiving user from event.
    this.profileService.profilePageLoaded.next(true);
    this.authUid=this.auth.userId;
    console.log("auth serice user id: "+ this.authUid);

    this.profileService.userrecieved.subscribe((res) =>{
      this.recievedUser= Object(res);      
    })

    this.Route.params.subscribe(params => {
      this.rUid = params['userId'];
      console.log('parameter extracted: ')
      console.log(this.rUid);
      this.userId=this.rUid;
      console.log('local userId in profile service: '+this.userId)
    }, err =>{});
    if(this.userId===this.authUid){ 
          this.check=true;
        }
        else{
          this.check=false;
        }


    this.getUserDetails();
    this.profileService.updateProfile.subscribe(()=>{
      console.log('updated profile loading')
      this.getUserDetails();
    }, err =>{
      alert('Not able to update profile')
    })
    
    
  }

  getUserDetails()
  {
    this.isFetching=true;
    console.log("getUserDetails before response: "+this.userId)
      this.userService.getDetails(this.userId).subscribe(res =>{
        this.isFetching=false;
      this.user=Object(res);
      this.username=this.user.username;
      this.loadUserProfile(this.userId);
    })
  }

  loadUserProfile(uid: string) {
    this.isFetching=true;
    this.profileService.getUserProfile(uid).subscribe((data) => {
      this.isFetching=false;
      this.user=Object(data);
      this.getUserPosts(uid);
    }, () =>{
      alert('something went wrong in retrieveing user profile');
    });
  }

  loadUserPosts(uid: string) {
    this.isFetching=true;    
    this.profileService.getUserPosts(uid).subscribe((data) => {
      this.userPosts = data;
      this.isFetching=false;
    }, (err) => {
      alert('error in getting posts: ' + err);
    });
  }

  getUserPosts(uid: string) {
    this.isFetching=true;

    console.log('getting posts for the user: '+ uid)
    this.profileService.getUserPosts(uid).pipe(map((response: any) => {
      const localPosts: Posts[] = [];
  
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const post = response[key]; 
          post.postId = key;
          localPosts.push(post);
        }
      }
      return localPosts;
    })).subscribe((data) => {
      this.userPosts = data;
      this.isFetching=false;
      this.sorting();
    });
  }

  sorting(){
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/landing']);
  }

  edit() {
    console.log('userId in auth called in profile componenet: '+this.auth.userId)
    this.dialog.open(EditProfileComponent);
  }
  route(routePath: string) {
    this.router.navigate([routePath]);
  }

  ngOnDestroy(){
    this.profileService.profilePageLoaded.next(false);
  }
}
