import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'worktab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../worktab/worktab.module').then(m => m.WorktabPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'wodetab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../wodetab/wodetab.module').then(m => m.WodetabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/worktab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/worktab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
