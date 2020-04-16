import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'API';
  myStorage = window.localStorage;

  constructor(private router: Router) {
    if (localStorage.getItem('access-token')) {
      console.log('Token tu je');
      AuthenticationService.token.access_token = (localStorage.getItem('access-token'));
      this.router.navigate(['/userinfo']);

    } else {
      console.log('Token tu neni');

    }
  }

}

