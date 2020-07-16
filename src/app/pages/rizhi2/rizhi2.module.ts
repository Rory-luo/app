import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Rizhi2PageRoutingModule } from './rizhi2-routing.module';

import { Rizhi2Page } from './rizhi2.page';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Rizhi2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rizhi2PageRoutingModule
  ],
  declarations: [Rizhi2Page]
})
export class Rizhi2PageModule {}
