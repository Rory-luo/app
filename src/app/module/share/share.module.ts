import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {SliderComponent} from '../slider/slider.component';


@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[SliderComponent],
})
export class ShareModule { }
