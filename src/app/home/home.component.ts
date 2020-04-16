import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('access-token')) {
      console.log('Token tu je');
      AuthenticationService.token.access_token = (localStorage.getItem('access-token'));

      this.router.navigate(['/loggedin']);

    } else {
      console.log('Token tu neni');
    }
  }

}
