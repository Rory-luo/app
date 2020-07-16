import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable, TimeoutError, pipe } from "rxjs";

import { Utils } from "./Untils";
import { GlobalData } from "./GlobalData";
import { APP_SERVE_URL, REQUEST_TIMEOUT } from "./Constants";
import { Storage } from '@ionic/storage';
import { map } from "rxjs/operators";
import { NoplugService } from './noplugService';
import { NavController } from '@ionic/angular';

// @Injectable({
//   providedIn: 'root'
// })
export class Http2Service {
  constructor(
    public http: Http,
    private globalData: GlobalData,
    //private nativeService: NativeService,
    private noplugService: NoplugService,
    public storage: Storage,
    public nav: NavController
  ) { }
  
  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    url = Utils.formatUrl(url.startsWith('http') ? url : APP_SERVE_URL + url);
    return Observable.create(observer => {
      //this.noplugService.showLoading("请求中。。。", 2000);
      this.http.request(url, options).subscribe(res => {
        this.noplugService.hideLoading();
        if (res['_body'] == '') {
          res['_body'] = null;
        }
        observer.next(res);
      }, err => {
        this.requestFailed(url, options, err);//处理请求失败
        observer.error(err);
      });
    });
  }

  // public get(url: string, paramMap: any = null): Observable<Response> {
  //   return this.request(url, new RequestOptions({
  //     method: RequestMethod.Get,
  //     search: HttpService.buildURLSearchParams(paramMap)
  //   }));
  // }

  public get(url: string, paramMap: any = null): Observable<Response> {
    let option = new RequestOptions({
      method: RequestMethod.Get,
      search: Http2Service.buildURLSearchParams(paramMap)
    });
    return Observable.create(observer => {
      this.optionsAddToken(option).subscribe(res => {
        this.request(url, option).subscribe(r => {
          observer.next(r);
        });
      });
    })

  }
  public getJson(url: string, paramMap: any = null): Observable<Response> {
    let option = new RequestOptions({
      method: RequestMethod.Get,
      search: Http2Service.buildURLSearchParams(paramMap)
    });
    return Observable.create(observer => {
      this.http.get(url, option).subscribe(r => {
        observer.next(r);
      });
    })

  }

  public post(url: string, paramMap: any = null): Observable<Response> {
    let option = new RequestOptions({
      method: RequestMethod.Post,
      //  search: HttpService.buildURLSearchParams(paramMap).toString(),
      body: Http2Service.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    });
    return Observable.create(observer => {
      this.optionsAddToken(option).subscribe(res => {
        this.request(url, option).subscribe(r => {
          observer.next(r);
        });
      });
    })
  }
  public postNoAuth(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      //  search: HttpService.buildURLSearchParams(paramMap).toString(),
      body: Http2Service.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }



  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err: Response): void {
    this.noplugService.hideLoading();
    if (err instanceof TimeoutError) {
      this.noplugService.alert('请求超时,请稍后再试!');
      return;
    }
    //err数据类型不确定,判断消息体是否有message字段,如果有说明是后台返回的json数据
    let index = JSON.stringify(err['_body']).indexOf('message');
    // if (index != -1) {
    //   this.nativeService.alert(err.json().message || '请求发生异常');
    //   return;
    // }
    let status = err.status;
    let msg = '请求发生异常';
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    }
    else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    }
    //  else if (status === 500) {
    //   msg = '请求失败，服务器出错，请稍后再试';
    // }
    else if (status === 401) {
      this.nav.navigateRoot(['./login'])
      return;
    }
    // this.nativeService.alert(msg);
  }

  private optionsAddToken(options: RequestOptionsArgs): Observable<any> {
    return Observable.create(observer => {
      this.storage.get("LoginInfo").then(loginInfo => {
        if (loginInfo) {
          this.globalData.refreshToken = loginInfo.refresh_token;//获取新token需要旧token
          this.globalData.token = loginInfo.access_token;//获取新token需要旧token
          this.globalData.usertel = loginInfo.usertel;
          this.globalData.authTime = loginInfo.authTime;
        }else {
          this.nav.navigateRoot(['./login']);
        }
        if (new Date().getTime() - this.globalData.authTime > 1000 * 60 * 60 * 24 * 15) {
          if (this.globalData.token) {
            this.getNewToken(this.globalData.refreshToken).subscribe(res => {
              const now = new Date().getTime();
              this.globalData.authTime = now;
              this.globalData.token = res.access_token;
              this.globalData.refreshToken = res.refresh_token;
              observer.next(res);
              let loginInfo = { authTime: now, access_token: res.access_token, refresh_token: res.refresh_token, expires_in: res.expires_in };
              this.storage.set('LoginInfo', loginInfo);
              let token = this.globalData.token;
              if (options.headers) {
                options.headers.append('Authorization', 'Bearer ' + token);
              } else {
                options.headers = new Headers({
                  'Authorization': 'Bearer ' + token
                });
              }
            }, err => {
              let re = JSON.parse(err._body).error;
              if (re == "invalid_grant") {
                // this.nativeService.alert("授权过期，请重新登录~");
                this.nav.navigateRoot(['./login']);
              }
            })
          } else {
            this.nav.navigateRoot(['./login'])
          }
        }
        else {
          let token = this.globalData.token;
          if (options.headers) {
            options.headers.append('Authorization', 'Bearer ' + token);
          } else {
            options.headers = new Headers({
              'Authorization': 'Bearer ' + token
            });
          }
          observer.next();
        }
      });
    })
  }

  getNewToken(refreshToken) {
    var data = "grant_type=refresh_token&refresh_token=" + refreshToken + "&client_id=1";
    return this.http.request(APP_SERVE_URL + "Token", new RequestOptions({
      method: RequestMethod.Post,
      body: data,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    })).pipe(map((res: Response) => res.json()));
  }
}
