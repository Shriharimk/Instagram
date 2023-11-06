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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: Posts[] = [];
  post : Posts = new Posts();
  user : User = new User();
  userId:string = '';
  username: string = "";
  userPosts: Posts[]=[];
  recievedUser : User;
  rUid: string;
 


  constructor(
    private auth:AuthService,
    private profileService: ProfileService,
    private router: Router,
    private Route: ActivatedRoute,
    private dialog: MatDialog,
    private activatedRoute : ActivatedRoute
    ) {}
  

  ngOnInit() {
    // this.userId = this.auth.userId;
    // console.log('userId from auth service: '+this.userId);


    this.profileService.userrecieved.subscribe((res) =>{
      console.log('recieved response in profile service')
      console.log(res);
      this.recievedUser= Object(res);
      console.log(this.recievedUser)
    })

    this.Route.params.subscribe(params => {
      this.rUid = params['userId'];
      console.log('parameter extracted: ')
      console.log(this.rUid);
      this.userId=this.rUid;
      // this.loadProduct();
 
      // this.cartService.getCartObservable().subscribe(items => {
      //   this.cartCount = items.length;
      // });
   
    }, err =>{});
    // this.loadCommentsFromLocalStorage();

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
    console.log("getUserDetails before response: "+this.userId)
      this.auth.getDetails(this.userId).subscribe(res =>{
      this.user=Object(res);
      console.log('getting details for user:')
      console.log(this.user)
      console.log(" response");
      console.log(res)
      this.username=this.user.username;
      console.log('username: ' +this.username)
      console.log('userId in profileComponent : '+this.userId)
      this.loadUserProfile(this.userId);
    })
  }

  loadUserProfile(uid: string) {
    this.profileService.getUserProfile(uid).subscribe((data) => {
      this.user=Object(data);
      console.log('loading profile for user: ')
      console.log(this.user)
      // console.log('response in getUserDetails');
      // console.log(this.user);
      // console.log('asdfadfadfas')
      //this.loadUserPosts(uid);
      this.getUserPosts(uid);
    }, err =>{
      alert('something went wrong in retrieveing user profile');
    });
  }

  // loadUserPosts(uid: string) {
  //   console.log('uid recieved in loadUserPosts: '+uid)
  //   this.profileService.getUserPosts(uid).subscribe((data) => {
  //     this.posts = Object(data);
  //     console.log('response in profile component: ')
  //     console.log(this.posts);
  //   }, err =>{
  //     alert('error in getting posts: '+err)
  //   });
  // }
  loadUserPosts(uid: string) {
    this.profileService.getUserPosts(uid).subscribe((data) => {
      this.userPosts = data;
      // console.log('response in profile component:');
      // console.log(typeof(this.userPosts))
      // console.log(this.userPosts);
    }, (err) => {
      alert('error in getting posts: ' + err);
    });
  }

  getUserPosts(uid: string) {
    console.log('getting posts for the user: '+ uid)
    this.profileService.getUserPosts(uid).pipe(map((response: any) => {
      const localPosts: Posts[] = [];
  
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const post = response[key]; // Create a new post object
          post.postId = key;
          // console.log('new updated post instance within for loop for key :'+ key)
          // console.log(post)
          localPosts.push(post); // Push the new post object to the array
        }
      }
      // console.log('new updated local posts list: ')
      // console.log(localPosts)
      return localPosts;
    })).subscribe((data) => {
      // console.log('response data obj in getPosts(): ')
      // console.log(data)
      this.userPosts = data;
      // console.log('response assigned to global posts list : '+this.userPosts)
      // console.log(this.userPosts)
      // console.log('sorting in dO')
      this.sorting();
    });
  }
  
  sorting(){
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
    // console.log(this.posts);
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
}
