
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../shared/profile.service';
import { Posts } from '../class/posts';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';
import { User } from '../class/user';
import { PostService } from '../shared/post.service';
import { Subscription, map } from 'rxjs';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../shared/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualpage',
  templateUrl: './actualpage.component.html',
  styleUrls: ['./actualpage.component.css'],
})
export class ActualpageComponent {
  username : string='';
  path : string = '';
  likes:number;
  liked=false;
  comment_count: number;
  description: string='';
  searchItem: string = '';
  user :User= new User();
  post :Posts = new Posts();
  posts: Posts[] = [];
  postCount: number = 0; 
  userId: string= '';
  profileUser : User = new User();
  postUser: User = new User();
  currentLoopUser : User = new User();
  matchingUsers: any[] = []; 
  usersList : User[] =[];
  userImageMap: { [userId: string]: string } = {};
  userNameMap: { [userId:string]: string} = {};
  isFetching :Boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  sub1 : Subscription;
  sub2 : Subscription;
  sub3 : Subscription;
  sub4 : Subscription;
  sub5 : Subscription;
  sub6 : Subscription;
  sub7 : Subscription;


  constructor(
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private postService: PostService,
    private userService: UserService,
    private _snackBar: MatSnackBar){}
  
  ngOnInit(){
    this.getPosts();
    this.userId=this.auth.userId;
    console.log('user id from auth = '+this.userId)
    this.loadUserProfile(this.userId);
    this.getUsersList();
    
    this.sub1 = this.postService.newPostAdded.subscribe(data =>
    {
      this.getPosts();
      },err => {
        alert('Something went wrong');
    })

    this.sub2 = this.postService.postLiked.subscribe(data =>{
      this.getPosts();
      }, err =>{
        alert('Something went wrong');
      })
  }
  
  getUsersList(){
    console.log('Getting users list..')
    this.sub3 = this.userService.getUsers().pipe(map((response: any) => {
        const users: User[] = [];
    
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const localUser = response[key];
            localUser.userId=key; 
            users.push(localUser); // Push the new user object to the array of users
          }
        }
        return users;
      })).subscribe((data) => {
        this.usersList = data;
        this.usersList.forEach(user => {
        this.userImageMap[user.userId] = user.profileImage;
        this.userNameMap[user.userId] = user.username;
        });
      });
  }
  
  onSearchInputChange() {
  this.sub4 = this.userService.getUsers().subscribe((res) => {
      this.matchingUsers = this.usersList.filter(user =>user.username.toLocaleLowerCase().includes(this.searchItem.toLocaleLowerCase()));
    },err =>{
      if(this.matchingUsers.length<=0){
        alert('no matching users found')
      }
    });
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

  newPost(){
    console.log('Opening new post diaglog');
    this.dialog.open(NewPostComponent);
  }

  getPosts() {
    console.log('getting all Posts')
    this.sub6 = this.postService.getAllPosts().pipe(map((response: any) => {
      const posts: Posts[] = [];  
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          const post = response[key]; // Create a new post object
          post.postId = key;
          posts.push(post); // Push the new post object to the array
        }
      }
    return posts;
    })).subscribe((data) => {
      this.isFetching=true;
      this.posts = data;
      this.sorting();
    });
  }


  sortIncreasing(){
    console.log('Sorting the posts based on likes');
    this.posts.sort((a: Posts,b: Posts) => a.likes-b.likes);
  }
  sortDecreasing(){
    console.log('Sorting the posts based on likes');
    this.posts.sort((a: Posts,b: Posts) => b.likes-a.likes);
  }  
  sorting(){
    console.log('Sorting the posts based on timestamp');
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  
  
  likePost(post: Posts) {
    this.liked=true
    post.likes++;
    this.sub7 = this.postService.updatePost(post.postId, post).subscribe(() => {
      this.postService.postLiked.emit();
    }, err => {
      console.log('Error updating post likes: ', err);
      this.liked=false;
    });
  }


  navigateToProfile(userId: string) {
    console.log('userId to be navigated to from actual page: '+userId)
    this.router.navigate(['/profiles', userId]);
  }
  
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/landing']);
  }
  openSnackBar() {
    this._snackBar.open('Setup Your Profile!!', 'Ok!', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
