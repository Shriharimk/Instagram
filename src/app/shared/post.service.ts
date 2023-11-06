import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Posts } from '../class/posts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  newPostAdded = new EventEmitter<string>();
  postLiked = new EventEmitter<void>();

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://projectdemo-9f2d5-default-rtdb.firebaseio.com';
  
  getAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseUrl}/posts.json`);
  }
  newPost(post: Posts)
  {
    return this.http.post("https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts.json",post);
  }
  
  // getPosts(){
  //   return this.http.get("https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts.json")   
  // // }
  // updateLikes(post: Posts) {
  //   console.log(post.userId+' this is from updatelikes()')
  //   const postUrl = `${this.baseUrl}/posts/${post.userId}.json`;  
  //   // Create a new object with updated likes count
  //   const updatedPost = { ...post, likes: post.likes };  
  //   // Send a PUT request to update the post's likes count
  //   return this.http.put(postUrl, updatedPost);
  // }
  // likePost(post: Posts) {
  //   alert('in post service for likePost')
  //   console.log(post.likes+' before incr')
  //   post.likes++;
  //   this.updatePost(post);
  //   console.log(post.likes+' after incr')
  //   this.postLiked.emit(); 
  //   }
  updatePost(postId: string, post: Posts) {
    console.log('post object recieved in updatePost')
    console.log(post)
    const postUrl = `${this.baseUrl}/posts/${postId}.json`;
    console.log('postUrl being sent: ')
    console.log(postUrl)
    // Send a PUT request to update the post's likes count
    return this.http.put(postUrl, post);
  }
  
  getPost(postId: string){
    return this.http.get("https://projectdemo-9f2d5-default-rtdb.firebaseio.com/posts/"+postId+".json")
  }
}
