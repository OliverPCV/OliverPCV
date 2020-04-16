import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {CommentsModel} from '../models/Comments.model';
import {User} from '../models/User.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getComment(body: string, user_id: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    console.log(AuthenticationService.token.access_token);

    return this.http.post<CommentsModel>('http://85.160.64.233:3000/comments', {body, user_id}, {headers});

  }

  getComments(id: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    console.log(AuthenticationService.token.access_token);

    return this.http.get<CommentsModel>('http://85.160.64.233:3000/comments/?user_id=' + id, {headers});
  }

  deleteComment(id: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);

    console.log(AuthenticationService.token.access_token);

    return this.http.delete('http://85.160.64.233:3000/comments/' + id, {headers});
  }

  getPage(page: number, id: number) {
    const headers = new HttpHeaders()
      .set('User-Token', AuthenticationService.token.access_token);
    const params = new HttpParams()
      .set('page', page + '')
      .set('user_id', id + '');

    return this.http.get<User>('http://85.160.64.233:3000/comments/', {headers, params});
  }
}
