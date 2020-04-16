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
  // tslint:disable-next-line:variable-name
  private page_count: number;
  myStorage = window.localStorage;

  constructor(private http: HttpClient, private router: Router, private http2: HttpClient, private user: UserService, private auth: AuthenticationService, private userlogout: AuthenticationService) {
    console.log(AuthenticationService.token);

    this.user.getUser()
      .subscribe(
        (data: ReturnPage) => {

          this.users = data['users'];
          this.page_count = data.page_count + 1;

          console.log(this.users);
        }, (error) => {
        }
      );
  }

  ngOnInit() {
    if (localStorage.getItem('access-token')) {
      console.log('Token tu je');
      AuthenticationService.token.access_token = (localStorage.getItem('access-token'));
      this.router.navigate(['/userinfo']);

    } else {
      console.log('Token tu neni');

    }
  }

  clickProfile(id: number) {
    this.router.navigate(['/profile'], {queryParams: {id}});
  }

  logoutClick() {
    localStorage.clear();
    this.userlogout.getLogout()
      .subscribe(
        (data: User) => {
          AuthenticationService.token.access_token = '';
          console.log(AuthenticationService.token.access_token);
          }, (error) => {
        }
      );
  }

  get pageCount(): IterableIterator<number> {
    return new Array(this.page_count).keys();
  }

  loadPage(page: number) {
    this.user.getPage(page).subscribe(
      (data: User) => {
         this.users = data['users'];
         this.page_count = data.page_count + 1;
         console.log(this.users);
      }, (error) => {

      }
    );
    console.log(page);
  }
}
