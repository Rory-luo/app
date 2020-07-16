import { Injectable } from '@angular/core';

import { Http2Service } from '../provider/http2.service';
import { APP_SERVE_URL } from '../provider/Constants';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: Http2Service
  ) { }

  GetUserInfo(page, row) {
    return this.http.get(APP_SERVE_URL + 'api/Userinfo/GetItem', { page: page, row: row }).pipe(map((res: any) => res.json()));
  }

  AddUserInfo(name, pwd, sex) {
    return this.http.post(APP_SERVE_URL + 'api/Userinfo/AddUserInfo', { name: name, pwd: pwd, sex: sex }).pipe(map((res: any) => res.json()));
  }
}
