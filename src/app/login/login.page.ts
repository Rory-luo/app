import { Component, OnInit } from '@angular/core';
import { Response, Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { NavController, LoadingController, Events, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { APP_SERVE_URL } from '../provider/Constants';
import { NoplugService } from '../provider/noplugService';
import { Storage } from '@ionic/storage';
import { Utils } from '../provider/Untils';
import { GlobalData } from '../provider/GlobalData';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public http: Http,
    private NS: NoplugService,
    public storage: Storage,
    private globalData: GlobalData,
    private events: Events,
    public nav: NavController,
  ) { }

  ngOnInit() {
  }

  usertel = '13888425274';
  password = '123456';

  login() {
    if (!this.usertel) {
      this.NS.showToast('请输入手机号');
      return;
    }
    if (!this.password) {
      this.NS.showToast('请输入密码');
      return;
    }
    this.NS.setLoadingTrue();
    this.loginSev().subscribe((loginInfo) => {
      this.NS.showToast('登录成功');
      this.storage.clear(); // 清除缓存
      Utils.sessionStorageClear(); // 清除数据缓存
      this.globalData.authTime = new Date().getTime();
      this.globalData.token = loginInfo.access_token;
      this.globalData.refreshToken = loginInfo.refresh_token;
      this.globalData.usertel = this.usertel;
      this.globalData.userPassWord = this.password;
      this.events.publish('user+login', loginInfo);
      loginInfo.usertel = this.usertel;
      loginInfo.userPassWord = this.password;
      loginInfo.authTime = new Date().getTime();
      this.saveUserID().subscribe((res) => {
        if (res.status == "success") {
          this.storage.set('userID', res.data);
        }
      })
      this.storage.set('LoginInfo', loginInfo).then(res => {
        this.nav.navigateRoot(['']);
      });
    }, (err) => {
      const re = JSON.parse(err._body).error;
      this.NS.alert(re);
    });

  };
  loginSev() {
    return this.http.request(APP_SERVE_URL + 'Token', new RequestOptions({
      method: RequestMethod.Post,
      body: `grant_type=password&username=${this.usertel}&Password=${this.password}&ClientId=1`,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    })).pipe(map((res: Response) => res.json()));
  };
  saveUserID() {
    return this.http.get(APP_SERVE_URL + "api/apiUser/GetUserId?usertel=" + this.usertel).pipe(map((res: Response) => res.json(
    )));
  }

}
