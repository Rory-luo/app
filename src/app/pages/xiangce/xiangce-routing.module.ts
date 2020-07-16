import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XiangcePage } from './xiangce.page';

const routes: Routes = [
  {
    path: '',
    component: XiangcePage
  },
  {
    path: 'xiangceimgs',
    loadChildren: () => import('./xiangceimgs/xiangceimgs.module').then( m => m.XiangceimgsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XiangcePageRoutingModule {}
