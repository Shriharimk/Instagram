// profile.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {


  }
  private baseUrl = 'https://projectdemo-9f2d5-default-rtdb.firebaseio.com';
  updateProfile = new EventEmitter();
  userrecieved : EventEmitter<User> = new EventEmitter<User>();
  

  getUserProfile(uid: string) {
    console.log('user id recieved in profile.service')
    console.log(uid)
    return this.http.get(this.baseUrl+'/users/'+uid+'.json')
  }

  updateUserProfile(uid: string,updatedProfile: User) {
    console.log("userId recieved at profileservice: "+uid );
    console.log('User object recieved to be updated in the database at profileservice: ');
    console.log(updatedProfile);
    return this.http.put(this.baseUrl+'/users/'+uid+'.json',updatedProfile)
  }

  // getUserPosts(uid: string) {

  //   // return this.http.get<any[]>(`${this.baseUrl}/posts.json?orderBy=userId&equalTo="${uid}"`);
  //   console.log('uid recieved in profile service: '+uid)
  //   return this.http.get<any[]>(`${this.baseUrl}/posts.json?orderBy="userId"&equalTo="${uid}"`);
  // }
  getUserPosts(uid: string) {
    return this.http.get<any>(`${this.baseUrl}/posts.json`, {
      params: {
        orderBy: '"userId"',
        equalTo: `"${uid}"`,
      },
    });
  }

  searchUser(username: string): Observable<User[]> {
    // Fetch all user objects
    return this.http.get<User[]>(`${this.baseUrl}/users.json`);
  }
}
