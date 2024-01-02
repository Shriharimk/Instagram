import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Posts } from '../class/posts';
import { Observable, map } from 'rxjs';

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
  // getAllPosts(startIndex: number, limit: number): Observable<Posts[]> {
  //   console.log('post service call to get posts with pagination');
  //   const params = new HttpParams()
  //     .set('start', startIndex.toString())
  //     .set('limit', limit.toString());

  //   return this.http.get<Posts[]>(`${this.baseUrl}/posts.json`, { params });
  // }
  
  
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

  hostMethod(image: File) {
    console.log('image recieved: ')
    console.log(image)
    const apiUrl = 'https://api.imgbb.com/1/upload';
    const apiKey = '384825b3fc807f61653aff87b097e88e'

    const form = new FormData();
    form.append('image',image);
    console.log(form)
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    console.log('url being sent:')
    console.log(apiUrl, form, { headers })
    return this.http.post(apiUrl, form, { params: {key: apiKey} })
                    .pipe(map((response)=> response['data']['url']));
  }

  
}
