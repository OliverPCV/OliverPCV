import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Token from '../Token';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit {

  constructor(private http: HttpClient, private userlogout: AuthenticationService, public router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('access-token')) {
      console.log('Token tu je');
      AuthenticationService.token.access_token = (localStorage.getItem('access-token'));
      this.router.navigate(['/loggedin']);

    } else {
      console.log('Token tu neni');

    }
  }

  logoutClick() {
    localStorage.clear();
    this.userlogout.getLogout()
      .subscribe(
        (data: any) => {

          AuthenticationService.token.access_token = '';

          }, (error) => {

        }
      );
  }






}
