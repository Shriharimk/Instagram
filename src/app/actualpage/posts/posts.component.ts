import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Posts } from 'src/app/class/posts';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  posts: Posts[] = [];
  isFetching :Boolean = false;
  usersList : User[] =[];
  userImageMap: { [userId: string]: string } = {};
  userNameMap: { [userId:string]: string} = {};
  userId:string = '';
  @Input() order:string = '';






  constructor (
    private postService: PostService,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.getAllPosts();
    this.getUsersList();
    this.userId=this.auth.userId;
    console.log("order: "+this.order)


    this.postService.newPostAdded.subscribe(data =>
      {
        this.getAllPosts();
        },err => {
          alert('Something went wrong');
      })
  
      this.postService.postLiked.subscribe(data =>{
        this.getAllPosts();
        }, err =>{
          alert('Something went wrong');
        })

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && !changes['order'].firstChange) {
      this.reOrderPosts(this.order);
    }
  }

  getUsersList(){
    console.log('Getting users list..')
    this.userService.getUsers().pipe(map((response: any) => {
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
        console.log('userList from post component: ')
        console.log(this.usersList)
        this.usersList.forEach(user => {
        this.userImageMap[user.userId] = user.profileImage;
        this.userNameMap[user.userId] = user.username;
        });
      });
  }

  getAllPosts() {
    console.log('getting all Posts')
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
      this.isFetching=true;
      this.posts = data;
      console.log('Posts list: ')
      console.log(this.posts)
      this.sorting();
    });
  }

  sorting(){
    console.log('Sorting the posts based on timestamp');
    this.posts.sort((a, b) => b.timestamp - a.timestamp);
  }
  reOrderPosts(order: string) {
    console.log('called reorder function')
    if (order.match('increasing')) {
      this.posts.sort((a, b) => b.likes - a.likes);
    } else {
      this.posts.sort((a, b) => a.likes - b.likes);
    }
  }

  likePost(post: Posts) {
    post.likes++;
    this.postService.updatePost(post.postId, post).subscribe(() => {
      this.postService.postLiked.emit();
    }, err => {
      console.log('Error updating post likes: ', err);
    });
  }

  navigateToProfile(userId: string) {
    console.log('userId to be navigated to from actual page: '+userId)
    this.router.navigate(['/profiles', userId]);
  }

}
