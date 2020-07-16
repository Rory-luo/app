import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorktabPageRoutingModule } from './worktab-routing.module';

import { WorktabPage } from './worktab.page';

import {ShareModule} from '../module/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    WorktabPageRoutingModule,
  ],
  declarations: [WorktabPage]
})
export class WorktabPageModule {}
