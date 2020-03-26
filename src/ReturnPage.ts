import {User} from './app/models/User.model';

export class ReturnPage {
  users: User [];
  page: number;
  // tslint:disable-next-line:variable-name
  page_count: number;
}
