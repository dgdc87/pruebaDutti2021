import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '@models/user.model';
import { USERS_KEY, TOKEN_KEY } from '../../environments/environment';// JSON
import usersList from 'src/assets/json/users.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  login(userName: String, password: String): Observable<User>{
    return new Observable<User>( observer => {
      //Consulto los usuarios del localStorage.
      let users: Array<any> = localStorage.getItem(USERS_KEY) && Array.isArray(JSON.parse(localStorage.getItem(USERS_KEY))) ? JSON.parse(localStorage.getItem(USERS_KEY)) : usersList;
      if(!Array.isArray(users)) users = [];
      users = users.filter( user => (user.first_name === userName || user.username === userName  )); //&& user.password === password);
      if(users.length > 0){
        localStorage.setItem(TOKEN_KEY, btoa(JSON.stringify(users[0])));
        observer.next(users[0]);
        observer.complete();
      }else{
        observer.error('Error login');
      }
    })
  }

  register(userToAdd: User): Observable<User>{
    return new Observable<User>( observer => {
      //Consulto los usuarios del localStorage para verificar que no exista un usuario con mismo first_name o username
      let allUsers: Array<User> = localStorage.getItem(USERS_KEY) && Array.isArray(JSON.parse(localStorage.getItem(USERS_KEY))) ? JSON.parse(localStorage.getItem(USERS_KEY)) : usersList;
      if(!Array.isArray(allUsers)) allUsers = [];
      let users: Array<User> = allUsers.filter( user => (user.first_name === userToAdd.first_name || user.username === userToAdd.username  )); //&& user.password === password);
      if(users.length === 0){
        allUsers.push(userToAdd);
        localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
        localStorage.setItem(TOKEN_KEY, btoa(JSON.stringify(userToAdd)));
        observer.next(userToAdd);
        observer.complete();
      }else{
        observer.error('Error: usuario ya registrado');
      }
    })
  }

  logout(): void {
    localStorage.setItem(TOKEN_KEY, '');
  }
}
