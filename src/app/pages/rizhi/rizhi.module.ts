import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RizhiPageRoutingModule } from './rizhi-routing.module';

import { RizhiPage } from './rizhi.page';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RizhiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RizhiPageRoutingModule
  ],
  declarations: [RizhiPage]
})
export class RizhiPageModule {}
