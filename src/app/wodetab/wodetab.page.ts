import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../provider/http2.service';
import { NavController, AlertController } from '@ionic/angular';
import { NoplugService } from '../provider/noplugService';
import { APP_SERVE_URL } from '../provider/Constants';
import { map } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { Utils } from "../provider/Untils"

@Component({
  selector: 'app-wodetab',
  templateUrl: './wodetab.page.html',
  styleUrls: ['./wodetab.page.scss'],
})
export class WodetabPage implements OnInit {

  constructor(
    public nav: NavController, 
    public http: Http2Service, 
    public Ns: NoplugService, 
    public storage: Storage, 
    public alertController: AlertController
  ) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确定 <strong>退出</strong> 当前账户？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.Ns.showToast("取消操作");
          }
        }, {
          text: '确定',
          handler: () => {
            this.export();
          }
        }
      ]
    });
    await alert.present();
  }

  staffName: any = "";
  nickName: any = "";
  userTel: any = "";
  staffLogoImg: any = "";

  ngOnInit() {
    this.http.get(APP_SERVE_URL + "api/apiUser/GetUserInfo").pipe(map((res: any) => res.json())).subscribe(res => {
      this.Ns.hideLoading();
      if (res.status == "success") {
        this.storage.set('UserInfo', res.data).then(res => {
        });
        this.staffName = res.data.staffName;
        this.nickName = res.data.nickName;
        this.staffLogoImg = res.data.staffLogoImg;
        this.userTel = res.data.userTel;
        
      } else {
        this.Ns.showToast("加载用户信息失败");
      }
    })
  }

  Click(type) {
    if (type == 1) {
      //修改密码
      this.Ns.showToast("开发中……");
    } else if (type == 2) {
      // this.nav.navigateRoot(['./fankui-info']);

    } else if (type == 3) {
      
    }else if(type==4){

    }else if(type==5){
      // this.nav.navigateRoot(['./aboutwe']);
    }
  };

  export() {
    this.storage.clear(); // 清除缓存
    Utils.sessionStorageClear(); // 清除数据缓存
    this.Ns.showToast("退出登陆成功");
    this.nav.navigateRoot(['./login']);
  };

  exportLogin() {
    this.presentAlertConfirm();
  };
}
