import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';
import { NoplugService } from 'src/app/provider/noplugService';
import { Http2Service } from 'src/app/provider/http2.service';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-addxiangce',
  templateUrl: './addxiangce.component.html',
  styleUrls: ['./addxiangce.component.scss'],
})
export class AddxiangceComponent implements OnInit {

  AllData = {
    staffID: this.navparams.data.userID,
    xiangceID: 0,
    xcTitle: '',
  }

  constructor(
    public modalCtrl: ModalController,
    public NP: NoplugService,
    public http: Http2Service,
    public navparams: NavParams
  ) { }

  ngOnInit() {
    if (this.navparams.data.ID != 0) {  //如果不等于0，则说明是修改操作
      this.AllData.xiangceID = this.navparams.data.ID;
      this.http.get(APP_SERVE_URL + "api/apiXiangce/GetOneXiangceInfo", { xiangceID: this.AllData.xiangceID }).pipe(map((res: any) => res.json())).subscribe(res => {
        console.log(res.data.rizhiContent);
        this.AllData.xcTitle = res.data.xcTitle;
      });
    }
  }

  //关闭模态框
  closeModal() {
    this.navparams.data.modal.dismiss({
      'result': this.AllData,
    });
    // this.modalCtrl.dismiss({
    //   'dismissed': true,
    // });
  };

  //保存相册
  SaveXiangce() {
    if (this.AllData.xcTitle == "") {
      this.NP.showToast("请输入相册名称");
      return;
    }
    this.http.get(APP_SERVE_URL + "api/apiXiangce/addXiangce", { xcTitle: this.AllData.xcTitle, userID: this.AllData.staffID, xiangceID: this.AllData.xiangceID }).pipe(map((res: any) => res.json())).subscribe(res => {
      this.NP.showToast(res.message);
      if (res.status == "success") {
        this.navparams.data.modal.dismiss({
          'result': this.AllData,
        });
        // this.modalCtrl.dismiss({
        //   'dismissed': true,
        // });
      }
    });
  };

}
