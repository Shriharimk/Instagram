import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://projectdemo-9f2d5-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  updateUsers(updatesUserList: User[]){
    console.log('updated Userlist recieved in user service')
    console.log(updatesUserList)
    return this.http.put(`${this.baseUrl}/users.json`,updatesUserList)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users.json`);
  }
}
