import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Token from '../Token';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Authentication} from '../models/Authentication.model';
import {User} from '../models/User.model';
import {AuthenticationService} from '../services/authentication.service';
import {ReturnPage} from '../../ReturnPage';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {


  private users = [];

   private temparray = [];


  constructor(private http: HttpClient, private router: Router, private http2: HttpClient, private user: UserService, private auth: AuthenticationService, private userlogout: AuthenticationService) {
    console.log(AuthenticationService.token);

    this.user.getUser()
      .subscribe(
      (data: ReturnPage) => {

        const headers = new HttpHeaders()
          .set('User-Token', AuthenticationService.token.access_token);

        for (let i = 0; i < (data.page_count); i++) {
          this.http.get<ReturnPage>('http://85.160.64.233:3000/users/?page=' + i, {headers}).subscribe(data => {
            this.temparray = data.users.concat(this.temparray);
            this.temparray.concat(this.users);

            this.users = this.temparray;
            console.log(this.users);
          });
        }
        console.log(this.users);
        }, (error) => {
      }
    );
  }

  clickProfile(id: number) {
    this.router.navigate(['/profile'], {queryParams: {id}});
  }

  logoutClick() {
    this.userlogout.getLogout()
      .subscribe(
        (data: User) => {
          AuthenticationService.token.access_token = '';
          console.log(AuthenticationService.token.access_token);
          }, (error) => {

        }
      );
  }


  ngOnInit() {
  }

}
