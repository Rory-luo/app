import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodetabPageRoutingModule } from './wodetab-routing.module';

import { WodetabPage } from './wodetab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodetabPageRoutingModule
  ],
  declarations: [WodetabPage]
})
export class WodetabPageModule {}
