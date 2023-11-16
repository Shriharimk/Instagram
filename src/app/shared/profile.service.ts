// profile.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://instagram-83b4b-default-rtdb.firebaseio.com/';
  updateProfile = new EventEmitter();
  userrecieved : EventEmitter<User> = new EventEmitter<User>();
  

  getUserProfile(uid: string) {
    console.log('in getProfile service call')
    return this.http.get(this.baseUrl+'/users/'+uid+'.json')
  }

  updateUserProfile(uid: string,updatedProfile: User) {
    console.log('userId received in update: '+ uid)
    return this.http.put(this.baseUrl+'/users/'+uid+'.json',updatedProfile)
  }

  getUserPosts(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/posts.json`, {
      params: {
        orderBy: '"userId"',
        equalTo: `"${uid}"`,
      },
    });
  }

}
