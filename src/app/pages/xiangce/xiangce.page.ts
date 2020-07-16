import { Component, OnInit } from '@angular/core';

import { Http2Service } from 'src/app/provider/http2.service';
import { map } from 'rxjs/operators';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { ModalController, NavController } from '@ionic/angular';
import { AddxiangceComponent } from './modal/addxiangce/addxiangce.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-xiangce',
  templateUrl: './xiangce.page.html',
  styleUrls: ['./xiangce.page.scss'],
})
export class XiangcePage implements OnInit {

  AllData = {
    AllXiangce: [],
    isLoading: false,
    isMore: false,
    serchData: {
      userID: 0,
      page: 1,
      row: 10,
    }
  };

  constructor(
    public http: Http2Service,
    public modalController: ModalController,
    public nav: NavController,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get("userID").then(ss => {
      this.AllData.serchData.userID = ss;
      this.loadData(1, "");
    });
    //this.AllData.AllXiangce = [{'xcTitle': 'a1','addTime': null},{'xcTitle': 'a2','addTime': null},];
  }

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
    this.http.get(APP_SERVE_URL + "api/apiXiangce/xiangceList", this.AllData.serchData).pipe(map((res: any) => res.json())).subscribe(res => {
      console.log(res);
      this.AllData.isLoading = false;
      if (res.data.length == 0) {
        this.AllData.isMore = false;
      }
      if (isRefresh == 1) {
        this.AllData.AllXiangce = res.data;
      } else {
        this.AllData.AllXiangce = this.AllData.AllXiangce.concat(res.data);
      }
      if (event != "") {
        event.target.complete();
      }
    })
  };

  doRefresh(event) {
    this.loadData(1, event);
  };
  LoadMoreData(event) {
    this.loadData(2, event);
  };

  //添加相册
  async toAddXangce() {
    const modal = await this.modalController.create({
      component: AddxiangceComponent,
      componentProps: {
        userID: this.AllData.serchData.userID,
        ID: 0,   //给模态框组件传递参数，相册ID，添加传0，修改操作则传递要修改的相册ID
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

  //调转到相册
  jumpToXiangce(item) {
    console.log(item);
    this.nav.navigateRoot(['./xiangceimgs',item.id]);
  };
}
