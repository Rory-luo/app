/**
 * Created by yanxiaojun on 2017/4/13.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalData {

  private _userId: string;//用户id
  private _usertel: string;//用户名
  private _userPassWord: string;//密码
  private _staffName: string;//姓名
  private _token: string;//token
  private _refreshToken: string;//refreshToken
  private _authTime: number;//token认证时间
  

  //设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
  private _showLoading: boolean = true;

  //app更新进度.默认为0,在app升级过程中会改变
  private _updateProgress: number = -1;
  //是否有网
  private _isNetwork: boolean = true;
  //已读货源列表
  private _goodsYD: any = [];

  private _loginErr: any = 0;//解决重复跳转登录的问题

  get loginErr() {
    return this._loginErr;
  }
  set loginErr(value) {
    this._loginErr = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  set userPassWord(value: string) {
    this._userPassWord = value;
  }

  get userPassWord(): string {
    return this._userPassWord;
  }

  get usertel(): string {
    return this._usertel;
  }

  set usertel(value: string) {
    this._usertel = value;
  }

  get staffName(): string {
    return this._staffName;
  }

  set staffName(value: string) {
    this._staffName = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get updateProgress(): number {
    return this._updateProgress;
  }

  set updateProgress(value: number) {
    this._updateProgress = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }


  get authTime(): number {
    return this._authTime;
  }

  set authTime(value: number) {
    this._authTime = value;
  }
  get isNetwork(): boolean {
    return this._isNetwork;
  }

  set isNetwork(value: boolean) {
    this._isNetwork = value;
  }
}
