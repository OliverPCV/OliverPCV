import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Token from '../Token';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Authentication} from '../models/Authentication.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  private color: string;
  private wrong = false;
  private email = '';
  private password = '';

  constructor(private http: HttpClient, private router: Router, private authentication: AuthenticationService) {

  }

  loginClick() {
    this.authentication.getLogin(this.email, this.password).subscribe(
      (data: Authentication) => {

          this.authentication.setToken(data);
          console.log(data);
          this.router.navigate(['/loggedin']);
      }, (error) => {

      }
    );
  }


  ngOnInit() {
  }

}
