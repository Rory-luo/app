import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorktabPage } from './worktab.page';

const routes: Routes = [
  {
    path: '',
    component: WorktabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorktabPageRoutingModule {}
