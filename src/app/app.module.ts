import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GlobalData } from './provider/GlobalData';
import { HttpModule } from '@angular/http';
import { Http2Service } from './provider/http2.service';
import { IonicStorageModule } from '@ionic/storage';
import { NoplugService } from './provider/noplugService';

import { FormsModule } from '@angular/forms';

import { AddrizhiComponent } from './pages/rizhi/addrizhi/addrizhi.component';
import { Addrizhi2Component } from './pages/rizhi2/addrizhi2/addrizhi2.component';
import { PopComponentComponent } from './pages/popover/pop-component/pop-component.component';

import {AddxiangceComponent} from './pages/xiangce/modal/addxiangce/addxiangce.component';
import {AddimgComponent} from './pages/xiangce/modal/addimg/addimg.component';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [
    AppComponent,
    AddrizhiComponent,
    Addrizhi2Component,
    PopComponentComponent,
    AddxiangceComponent,
    AddimgComponent,
  ],
  entryComponents: [
    AddrizhiComponent,
    Addrizhi2Component,
    PopComponentComponent,
    AddxiangceComponent,
    AddimgComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),//@ionic/storage 引入缓存模块
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoplugService,
    GlobalData,
    Http2Service,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
