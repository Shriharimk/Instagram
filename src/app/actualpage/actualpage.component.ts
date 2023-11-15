
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../shared/profile.service';
import { Posts } from '../class/posts';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';
import { User } from '../class/user';
import { PostService } from '../shared/post.service';
import { map } from 'rxjs';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../shared/user.service';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
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


  constructor(
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private postService: PostService,
    private userService: UserService){}
  ngOnInit(){
    this.getPosts();
    this.userId=this.auth.userId;
    console.log('user id from auth = '+this.userId)
    this.loadUserProfile(this.userId);
    this.getUsersList();
    
    // console.log('userID in ngInOnIt: '+ this.userId);
    this.postService.newPostAdded.subscribe(data =>
          {
            // console.log(data);
            this.getPosts();
          },err => {
            alert('Something went wrong');
          })
        this.postService.postLiked.subscribe(data =>{
          this.getPosts();
        }, err =>{
          alert('Something went wrong')
        })
  }
  
  getUsersList(){
      this.userService.getUsers().pipe(map((response: any) => {
        const users: User[] = [];
    
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const localUser = response[key];
            localUser.userId=key; 
            users.push(localUser); // Push the new user object to the array of users
          }
        }
        // console.log('new updated local posts list: ')
        // console.log(posts)
        return users;
      })).subscribe((data) => {
        // console.log('response data obj in getPosts(): ')
        // console.log(data)
        this.usersList = data;
        console.log('new users')
        console.log(this.usersList)
        // console.log('response assigned to global posts list : '+this.posts)
        // console.log(this.posts)
        // console.log('sorting in dO')
      });
    }
  
  onSearchInputChange(searchInput :  string) {
    this.userService.getUsers().subscribe((res) => {
      // Update the userResults with the search results
      // console.log('control back in actual-page component')
      // console.log('input recieved: '+searchInput)
      // console.log('recieved response: ')
      // console.log(res)
      this.matchingUsers = this.usersList.filter(user =>user.username.toLocaleLowerCase().includes(this.searchItem.toLocaleLowerCase()));
      // this.matchingUsers = res.filter((user) => user.username.includes(searchInput));
      // console.log('matching user list recieved: ')
      // console.log(this.matchingUsers);
    },err =>{
      // console.log(' Error loading matching user list')
      if(this.matchingUsers.length<=0){
        alert('no matching users found')
      }
    });
  }
  showUserSearchPopup: boolean = false;
  openUserSearch() {
    this.showUserSearchPopup = true;
  }
  selectedUser(user: User){
    console.log('user sent to service: ')
    console.log(user.userId)
    this.profileService.userrecieved.emit(user);
    console.log('emitted event')
    this.router.navigate(['/profile'])
  }

  loadUserProfile(uid: string) {
    this.profileService.getUserProfile(uid).subscribe((data) => {
      this.profileUser=Object(data);
      // console.log('response in getUserDetails');
      // console.log(this.user);
      // console.log('asdfadfadfas')
      //this.loadUserPosts(uid);
    }, err =>{
      alert('something went wrong in retrieveing user profile');
    });
  }
  newPost(){
    this.dialog.open(NewPostComponent);
  }
  profile(){
    this.dialog.open(ProfileComponent);
  }
  getAllPosts()
  {
      this.postService.getAllPosts().subscribe((posts) => {
      this.posts = Object.values(posts);
      this.sorting();
    });
  }
  

  getPosts() {
    this.postService.getAllPosts().pipe(map((response: any) => {
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
      this.posts = data;
      this.sorting();
    });
  }
  sortIncreasing(){
    this.posts.sort((a: Posts,b: Posts) => a.likes-b.likes);
  }
  sortDecreasing(){
    this.posts.sort((a: Posts,b: Posts) => b.likes-a.likes);
  }
  
  sorting(){
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
    // console.log(this.posts);
  }
  
  getPostDetails(postId: string){
    this.postService.getPost(postId).subscribe(res =>{
      // console.log(res);
    }, err=>{
      alert('Something went wrong. Error: '+err)
    })
  }

  image(userId: string){
    console.log('userId for the post received: ')
    console.log(userId);
    let profileImage: string = '';
    for(var user of this.usersList ){
      if(user.userId==userId){
        profileImage = user.profileImage
      }
    }
    return profileImage;
  }
  // likePost(post : Posts){
  //   post.likes++;
  //   console.log(post.userId+' this is from likePost() from the actual-page')
  //   this.postService.postLiked.emit();
  //   this.postService.updateLikes(post).subscribe(() => {
  //     // Successfully updated likes on the server
  //   });
  // }
  // likePost(post: Posts) {
  //   alert('in post service for likePost')
  //   console.log('postId in likePost: '+post.postId)
  //   console.log(post.likes+' before incr')
  //   ++post.likes;
  //   // this.postService.updatePost(post.postId, post).subscribe(()=>{
  //   //   console.log('liked and updated')
  //   // },err => {
  //   //   console.log('error',err)
  //   // })
  //   console.log(post.likes+' after incr')
  //   this.postService.postLiked.emit(); 
  //   }
  // // likePost(post: Posts) {
  // //   this.postService.likePost(post);
  // // }
  likePost(post: Posts) {
    // Increment the likes for the local post
    // console.log('post object recieved: ')
    // console.log(post)
    this.liked=true
    post.likes++;
    // console.log('post object sending ...: ')
    // console.log(post)  
    // Update the post in the database
    this.postService.updatePost(post.postId, post).subscribe(() => {
      // Successfully updated likes on the server
      this.postService.postLiked.emit();
    }, err => {
      console.log('Error updating post likes: ', err);
    });
  }
  navigateToProfile(userId: string) {
    console.log('userId recieved in navigateToProfile: '+userId)
    console.log('profileUser id: '+this.profileUser.userId)
    this.router.navigate(['/profiles', userId]);
  }
  
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/landing']);
  }
  route(routePath: string) {
    this.router.navigate([routePath]);
  }    
}
