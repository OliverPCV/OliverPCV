import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/User.model';
import {AuthenticationService} from '../services/authentication.service';
import Token from '../Token';
import {CommentsService} from '../services/comments.service';
import {CommentsModel} from '../models/Comments.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User;
  private user2: User;
 private com: string;
 private comments = [];
  // tslint:disable-next-line:variable-name
  private user_id: number;
  private body: string;
  // tslint:disable-next-line:variable-name
  private username: string;
  private id: number;
  // tslint:disable-next-line:variable-name
  private page_count: number;
  // tslint:disable-next-line:variable-name
  private trash = false;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private profile: UserService, private userlogout: AuthenticationService, private comment: CommentsService) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(i => {
      this.profile.getUserWithId(i.id).subscribe(user => {
        this.user = user;
        console.log(this.user);
        this.comment.getComments(this.user.id).subscribe( ( data: CommentsModel) => {
            this.comments = data['comments'];
            this.page_count = data.page_count + 1;
            console.log(this.comments);
        });
      });
    });
  }

  sendComment() {
    this.comment.getComment(this.com, this.user.id).subscribe(
        (data: CommentsModel) => {
          this.trash = true;
          this.body = data.body;
          this.user_id = data.user_id;
          this.username = data.author_id.username;
          this.id = data.id;
          console.log(data);
        });
  }

  clickTrash() {
    this.comment.deleteComment(this.id).subscribe(
      (data: CommentsModel) => {
        this.body = '';
        this.username = '';
        this.trash = false;
      });
  }
  get pageCount(): IterableIterator<number> {
    return new Array(this.page_count).keys();
  }

  loadPage(page: number) {
    this.comment.getPage(page, this.user.id).subscribe(
      (data: User) => {
        this.comments = data['comments'];
        this.page_count = data.page_count + 1;

      }, (error) => {

      }
    );
    console.log(page);
  }

  logoutClick() {
    this.userlogout.getLogout()
      .subscribe(
        (data: any) => {
          AuthenticationService.token.access_token = '';

          }, (error) => {
        }
      );
  }


}
