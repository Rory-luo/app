import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XiangceimgsPage } from './xiangceimgs.page';

const routes: Routes = [
  {
    path: '',
    component: XiangceimgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XiangceimgsPageRoutingModule {}
