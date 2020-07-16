import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams } from '@ionic/angular';
import { NoplugService } from 'src/app/provider/noplugService';
import { Http2Service } from 'src/app/provider/http2.service';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-addrizhi2',
  templateUrl: './addrizhi2.component.html',
  styleUrls: ['./addrizhi2.component.scss'],
})
export class Addrizhi2Component implements OnInit {

  AllData = {
    staffID: this.navparams.data.userID,
    rizhiID: 0,
    rizhiContent: "",
  };

  constructor(
    public modalCtrl: ModalController,
    public NP: NoplugService,
    public http: Http2Service,
    public navparams: NavParams
  ) { }

  ngOnInit() {
    if (this.navparams.data.ID != 0) {  //如果不等于0，则说明是修改操作
      this.AllData.rizhiID = this.navparams.data.ID;
      this.http.get(APP_SERVE_URL + "api/apiRizhi/GetOneRizhiInfo", { rizhiID: this.AllData.rizhiID }).pipe(map((res: any) => res.json())).subscribe(res => {
        console.log(res.data.rizhiContent);
        this.AllData.rizhiContent = res.data.rizhiContent;
      });
    }
  }

  //关闭日志模态框
  closeModal() {
    this.navparams.data.modal.dismiss({
      'result': this.AllData,
    });
    // this.modalCtrl.dismiss({
    //   'dismissed': true,
    // });
  };

  //保存日志
  SaveRizhi() {
    if (this.AllData.rizhiContent == "") {
      this.NP.showToast("请输入日志内容");
      return;
    }
    this.http.get(APP_SERVE_URL + "api/apiRizhi/addrizhi", { rizhi: this.AllData.rizhiContent, userID: this.AllData.staffID, rizhiID: this.AllData.rizhiID }).pipe(map((res: any) => res.json())).subscribe(res => {
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
