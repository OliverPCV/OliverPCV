import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User.model';
import {Authentication} from '../models/Authentication.model';
import {AuthenticationService} from './authentication.service';
import Token from '../Token';
import {ReturnPage} from '../../ReturnPage';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }


  getHeaders() {}
  getUser() {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    console.log(AuthenticationService.token.access_token);

    return this.http.get<ReturnPage>('http://85.160.64.233:3000/users', {headers});
  }

  getUserWithId(id: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    console.log(AuthenticationService.token.access_token);
    return this.http.get<User>('http://85.160.64.233:3000/user/' + id, {headers});

  }

  getPage(page: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    return this.http.get<User>('http://85.160.64.233:3000/users/?page=' + page, {headers});
  }


}



