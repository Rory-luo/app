import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Http2Service } from 'src/app/provider/http2.service';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { NoplugService } from 'src/app/provider/noplugService';
import { map } from 'rxjs/operators';
import { ModalController, NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AddrizhiComponent } from './addrizhi/addrizhi.component';

@Component({
  selector: 'app-rizhi',
  templateUrl: './rizhi.page.html',
  styleUrls: ['./rizhi.page.scss'],
})
export class RizhiPage implements OnInit {
  AllData = {
    AllRizhi: [],
    isLoading: false,
    isMore: false,
    serchData: {
      userID: 0,
      page: 1,
      row: 10,
    }
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public storage: Storage,
    public http: Http2Service,
    public modalController: ModalController,
    public alertController: AlertController,
    public NP: NoplugService,
  ) { }

  ngOnInit() {
    // this.storage.get('pageID').then((val) => {
    //   this.AllData.serchData.PageID=val;
    // })
    this.storage.get("userID").then(ss => {
      this.AllData.serchData.userID = ss;
      this.loadData(1, "");
    });
  };
  loadData(isRefresh, event) {
    if (isRefresh) {
      if (isRefresh == 1) {
        this.AllData.serchData.page = 1;
        this.AllData.isLoading = true;
        this.AllData.isMore = true;
      } else {
        this.AllData.serchData.page++;
      }
    }
    this.http.get(APP_SERVE_URL + "api/apiRizhi/rizhiList", this.AllData.serchData).pipe(map((res: any) => res.json())).subscribe(res => {
      console.log(res);
      this.AllData.isLoading = false;
      if (res.data.length == 0) {
        this.AllData.isMore = false;
      }
      if (isRefresh == 1) {
        this.AllData.AllRizhi = res.data;
      } else {
        this.AllData.AllRizhi = this.AllData.AllRizhi.concat(res.data);
      }
      if (event != "") {
        event.target.complete();
      }
    })
  };
  //添加日志
  async Addrizhi() {
    const modal = await this.modalController.create({
      component: AddrizhiComponent,
      componentProps: {
        userID: this.AllData.serchData.userID,
        ID: 0,   //给日志模态框组件传递参数，日志ID，添加传0，修改操作则传递要修改的日志ID
      },
      cssClass: "conditions"
    });
    //return (await modal).present();
    await modal.present();

    //当前页面监听当前模态对话框销毁的事件
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.loadData(1, "");    //模态框关闭以后，重新刷新页面数据
    }
  };

  //修改日志
  async updateRizhi(item) {
    const modal = await this.modalController.create({
      component: AddrizhiComponent,
      componentProps: {
        userID: this.AllData.serchData.userID,
        ID: item.id,  //给日志模态框组件传递参数，日志ID，添加传0，修改操作则传递要修改的日志ID
      },
      cssClass: "conditions"
    });
    //return (await modal).present();
    await modal.present();

    //当前页面监听当前模态对话框销毁的事件
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.loadData(1, "");      //模态框关闭以后，重新刷新页面数据
    }
  };
  //删除日志
  async deleteRizhi(item) {
    const alert = await this.alertController.create({
      header: '提示',
      message: '<strong>确定删除这条日志吗？</strong>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.NP.showToast("取消操作");
          }
        }, {
          text: '确定',
          handler: () => {
            this.http.post(APP_SERVE_URL + "api/apiRizhi/delRizhi", { rizhiID: item.id }).pipe(map((res: any) => res.json())).subscribe(res => {
              if (res.status == "success") {
                this.NP.showToast(res.message);
                this.loadData(1, "");
              } else {
                this.NP.showToast(res.message);
              }
            });
          }
        }
      ]
    });
    await alert.present();

  }

  doRefresh(event) {
    this.loadData(1, event);
  };
  LoadMoreData(event) {
    this.loadData(2, event);
  };

}
