import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://instagram-83b4b-default-rtdb.firebaseio.com/';
  
  constructor(private http: HttpClient) {}

  updateUsers(updatesUserList: User[]){
    console.log('updated Userlist recieved in user service')
    return this.http.put(`${this.baseUrl}/users.json`,updatesUserList)
  }

  getUsers(): Observable<User[]> {
    console.log('service call to getUsers ')
    return this.http.get<User[]>(`${this.baseUrl}/users.json`);
  }

  getDetails(uid: string)
  {
    console.log("user id received in user service: ")
    console.log(uid);
    return this.http.get(this.baseUrl+"users/"+uid+"/.json")    
  }
}
