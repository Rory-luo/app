import { Component, OnInit } from '@angular/core';

import { ModalController, NavParams, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { NoplugService } from 'src/app/provider/noplugService';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { Http2Service } from 'src/app/provider/http2.service';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { map } from 'rxjs/operators';
//import { resolve } from 'path';

@Component({
  selector: 'app-addimg',
  templateUrl: './addimg.component.html',
  styleUrls: ['./addimg.component.scss'],
})
export class AddimgComponent implements OnInit {

  AllData = {
    userID: this.navparams.data.userID,
    xiangceID: 0,
  };
  
  private imgurl: any;

  constructor(
    public modalCtrl: ModalController,
    public NP: NoplugService,
    public actionSheetController: ActionSheetController,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private alertController: AlertController,
    public http: Http2Service,
    public navparams: NavParams
  ) { }

  ngOnInit() {
    if (this.navparams.data.xiangceID != 0) {  //如果不等于0，则说明是修改操作
      this.AllData.xiangceID = this.navparams.data.xiangceID;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  };
  selectedImg() {
    this.presentActionSheet();
  };
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择图片来源',
      buttons: [{
        text: '拍照',
        handler: () => {
          this.NP.getPictureByCamera().subscribe(res => {
            console.log(res);
            this.uploadImg(res);
          });;
        }
      }, {
        text: '相册',
        handler: () => {
          this.NP.getPictureByPhotoLibrary().subscribe(res => {
            console.log(res);
            this.uploadImg(res);
          });
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          this.NP.showToast("操作取消");
        }
      }]
    });
    await actionSheet.present();
  };
  //loader: any = {};
  async uploadImg(fileURL) {
    // this.loader = this.loadingCtrl.create({ showBackdrop: false });
    // this.loader.present();

    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: '图片上传中...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');


    var uri = encodeURI(APP_SERVE_URL + "/api/apiXiangce/SaveUserImg");
    let options: FileUploadOptions = {};
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf("/") + 1);
    options.mimeType = "text/plain";
    const fileTransfer: FileTransferObject = this.transfer.create();
    let timer = null; //由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
    fileTransfer.onProgress(progressEvent => {
      if (progressEvent.lengthComputable) {
        let progress = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        ); //下载进度
        if (progress === 100) {
          //this.loader.dismiss();
        } else {
          if (!timer) {
            timer = setTimeout(() => {
              clearTimeout(timer);
              timer = null;
              let title = document.getElementsByClassName(
                "loading-content"
              )[0];
              title && (title.innerHTML = `上传进度：${progress}%`);
            }, 1000);
          }
        }
      } else {
        //loadingStatus.increment();
      }
    });
    fileTransfer
      .upload(fileURL, uri, options)
      .then(r => {
        //console.log("返回的图片路径："+r+",r.response:"+r.response); //r是返回的图片路径
        //alert(r);
        //this.loader.dismiss();
        this.NP.showToast("上传成功");

        r.response = r.response.substring(1, r.response.length - 1);
        console.log(r.response);

        this.imgurl = r.response;    //r是返回的图片路径
        this.addOneImgTodatabase(); //把上传的图片数据存到后台数据库
        
      })
      .catch(error => {
        console.log(error);
        //this.loader.dismiss();
        this.NP.alert("失败:" + error);
      });
  };

  //把上传的图片数据存到后台数据库
  addOneImgTodatabase(){
    console.log("imgurl:"+this.imgurl);
    this.http.get(APP_SERVE_URL + "api/apiXiangce/addOneImg", { xiangceID: this.AllData.xiangceID,imgPath: this.imgurl, staffID: this.AllData.userID}).pipe(map((res: any) => res.json())).subscribe(res => {
      this.NP.showToast(res.message);
      // if (res.status == "success") {
      //   this.NP.showToast("保存成功");
      // }
    });

  }

  ///长按事件
  doPress() {
    this.presentAlertConfirm();
  };
 async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确定 <strong>删除</strong>该图片？',
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
            //this.export();
          }
        }
      ]
    });
    await alert.present();
  }

}
