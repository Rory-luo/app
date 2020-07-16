import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rizhi2Page } from './rizhi2.page';

const routes: Routes = [
  {
    path: '',
    component: Rizhi2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Rizhi2PageRoutingModule {}
