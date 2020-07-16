import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XiangceimgsPageRoutingModule } from './xiangceimgs-routing.module';

import { XiangceimgsPage } from './xiangceimgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XiangceimgsPageRoutingModule
  ],
  declarations: [XiangceimgsPage]
})
export class XiangceimgsPageModule {}
