import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Token from '../Token';
import {AuthenticationService} from '../services/authentication.service';
import {Authentication} from '../models/Authentication.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input()

  private url = 'http://85.160.64.233:3000/session/register';
  private username = '';
  private email = '';
  private password = '';
  private passwordcontrol = '';
  private color: string;
  private wrong = false;

  constructor(private http: HttpClient, private router: Router, private authentication: AuthenticationService) {

  }

  registerClick() {
    if (this.password === this.passwordcontrol) {
      this.authentication.getRegistration(this.username, this.email, this.password, this.passwordcontrol)
        .subscribe(
          (data: Authentication) => {
            this.router.navigate(['/home']);

          }, (error) => {
            this.wrong = true;
            this.color = 'red';
          }
        );
    } else {
      this.wrong = true;
      this.color = 'red';
    }
  }


  ngOnInit() {
  }

}
