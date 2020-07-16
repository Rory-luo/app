import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AddimgComponent } from '../modal/addimg/addimg.component';
import { Storage } from '@ionic/storage';

import { ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { NoplugService } from 'src/app/provider/noplugService';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { Http2Service } from 'src/app/provider/http2.service';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer/ngx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-xiangceimgs',
  templateUrl: './xiangceimgs.page.html',
  styleUrls: ['./xiangceimgs.page.scss'],
})
export class XiangceimgsPage implements OnInit {

  AllData = {
    AllImgs: [],
    searchData: {
      xiangceID: 0,
      userID: 0,
      page: 1,
      row: 10,
    },
    isLoading: false,
    isMore: false,
  };
  private imgurl: any;    //上传的图片的返回路径

  constructor(
    public activeRoute: ActivatedRoute,
    public http: Http2Service,
    public NP: NoplugService,
    public modalController: ModalController,
    public storage: Storage,

    public modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private alertController: AlertController,
    //public navparams: NavParams
  ) {
    this.activeRoute.params.subscribe(params => {
      this.AllData.searchData.xiangceID = params.ID;
    });
   }

  ngOnInit() {
    this.storage.get("userID").then(ss => {
      this.AllData.searchData.userID = ss;
      this.LoadImgs(1, "");
    });
    
  }

  LoadImgs(isRefresh, event) {
    if (isRefresh == 1) {
      this.AllData.searchData.page = 1;
      this.AllData.isLoading = true;
      this.AllData.isMore = true;
    } else {
      this.AllData.searchData.page++;
    }
    this.http.get(APP_SERVE_URL + "api/apiXiangce/getOneXiangceImgs", this.AllData.searchData).pipe(map((res: any) => res.json())).subscribe(res => {
      if (res.status == "success") {
        this.AllData.isLoading = false;
        if (res.data.length == 0) {
          this.AllData.isMore = false;
        }
        if (isRefresh == 1) {
          this.AllData.AllImgs = res.data;
        } else {
          this.AllData.AllImgs = this.AllData.AllImgs.concat(res.data);
        }
      } else {
        this.NP.showToast(res.message);
      }
      if (event != "") {
        event.target.complete();
      }
    })
  };
  
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  };
  LoadMoreData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  };
  // async NewImgs() {
  //   const modal = await this.modalController.create({
  //     component: AddimgComponent,
  //     componentProps: {
  //       xiangceID: this.AllData.searchData.xiangceID,
  //       userID: this.AllData.searchData.userID,
  //     },
  //     cssClass: "conditions"
  //   });
  //   return (await modal).present();
  // };

  ////////////////以下是添加图片

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
    this.http.get(APP_SERVE_URL + "api/apiXiangce/addOneImg", { xiangceID: this.AllData.searchData.xiangceID,imgPath: this.imgurl, staffID: this.AllData.searchData.userID}).pipe(map((res: any) => res.json())).subscribe(res => {
      this.LoadImgs(1, "");
      this.NP.showToast(res.message);
      // if (res.status == "success") {
      //   this.NP.showToast("保存成功");
      // }
    });
  }
}
