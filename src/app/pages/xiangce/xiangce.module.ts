import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XiangcePageRoutingModule } from './xiangce-routing.module';

import { XiangcePage } from './xiangce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XiangcePageRoutingModule
  ],
  declarations: [XiangcePage]
})
export class XiangcePageModule {}
