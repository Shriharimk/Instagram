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
  private baseUrl = 'https://instagram-83b4b-default-rtdb.firebaseio.com';
  
  getAllPosts(): Observable<Posts[]> {
    console.log('post service call to get all posts')
    return this.http.get<Posts[]>(`${this.baseUrl}/posts.json`);
  }
  
  
  newPost(post: Posts)
  {
    return this.http.post(`${this.baseUrl}/posts.json`,post);
  }
  
  
  updatePost(postId: string, post: Posts) {
    console.log('Updating the post...')
    const postUrl = `${this.baseUrl}/posts/${postId}.json`;

    // Send a PUT request to update the post's likes count
    return this.http.put(postUrl, post);  
  }
  
  getPost(postId: string){
    return this.http.get(`${this.baseUrl}/posts/${postId}.json`)
  }
}
