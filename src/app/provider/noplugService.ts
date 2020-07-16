
import { Injectable } from "@angular/core";
import { ToastController, LoadingController, Platform, AlertController } from "@ionic/angular";
import {
    APP_DOWNLOAD,
    APK_DOWNLOAD,
    IMAGE_SIZE,
    QUALITY_SIZE,
    REQUEST_TIMEOUT,
    // CODE_PUSH_DEPLOYMENT_KEY,
    IS_DEBUG
} from "./Constants";

import { GlobalData } from "./GlobalData";
import { Observable } from "rxjs";
// import {Logger} from "./Logger";
import { Utils } from "./Untils";

import { Http } from "@angular/http";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Injectable()
export class NoplugService {
    private loading: LoadingController;
    private loadingIsOpen: boolean = false;

    constructor(
        private platform: Platform,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,

        private toast: ToastController,

        private loadingCtrl: LoadingController,
        private globalData: GlobalData,
        // public logger: Logger,
        // private geolocation: Geolocation,
        private http: Http,
        // private clipboard: Clipboard,
        // private codePush: CodePush
        private camera: Camera,
    ) {
    }


    async alert(title: string, subTitle: string = "") {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: subTitle,
            message: subTitle,
            buttons: [{ text: '确定' }]
        });
        await alert.present();
    }

    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */

    async showToast(message: string = '操作完成', duration: number = 2000) {
        const toast = await this.toast.create({
            message: message,
            duration: duration,
            position: 'bottom',
            color: 'dark',
            showCloseButton: false
        });
        toast.present();
    }

    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    async showLoading(content: string = '', duration: number = 10000) {
        const loading = await this.loadingCtrl.create({
            spinner: "crescent",
            duration: duration,
            message: content,
            translucent: false,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }
    /**
     * http请求默认转圈圈，请求前调用此方法禁用转圈圈
     */
    setLoadingTrue() {
        this.globalData.showLoading = false;
    }
    /**
     * 关闭loading
     */
    hideLoading(): void {
        if (!this.globalData.showLoading) {
            this.globalData.showLoading = true;
        }
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
    }
          /**
       * 通过拍照获取照片
       * @param options
       */
      getPictureByCamera(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
          sourceType: this.camera.PictureSourceType.CAMERA,
          destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
      };

      /**
       * 通过图库获取照片
       * @param options
       */
      getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
      };
          /**
       * 使用cordova-plugin-camera获取照片
       * @param options
       */
      getPicture(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
          sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
          destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
          quality: QUALITY_SIZE,//图像质量，范围为0 - 100
          //allowEdit: true,//选择图片前是否允许编辑
          encodingType: this.camera.EncodingType.JPEG,
          targetWidth: IMAGE_SIZE,//缩放图像的宽度（像素）
          targetHeight: IMAGE_SIZE,//缩放图像的高度（像素）
          saveToPhotoAlbum: false,//是否保存到相册
          correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
        }, options);
        return Observable.create(observer => {
          this.camera.getPicture(ops).then((imgData: string) => {
            if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
              observer.next('data:image/jpg;base64,' + imgData);
            } else {
              observer.next(imgData);
            }
          }).catch(err => {
            if (err == 20) {
              this.alert('没有权限,请在设置中开启权限');
              return;
            }
            if (String(err).indexOf('cancel') != -1) {
              return;
            }
            // this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
            this.alert('获取照片失败');
          });
        });
      };
}