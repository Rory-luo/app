import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rizhi',
    loadChildren: () => import('./pages/rizhi/rizhi.module').then( m => m.RizhiPageModule)
  },
  {
    path: 'test1',
    loadChildren: () => import('./pages/test1/test1.module').then( m => m.Test1PageModule)
  },
  { path: 'worktab', loadChildren: './worktab/worktab.module#WorktabPageModule' },
  {
    path: 'wodetab',
    loadChildren: () => import('./wodetab/wodetab.module').then( m => m.WodetabPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'rizhi2',
    loadChildren: () => import('./pages/rizhi2/rizhi2.module').then( m => m.Rizhi2PageModule)
  },
  {
    path: 'xiangce',
    loadChildren: () => import('./pages/xiangce/xiangce.module').then( m => m.XiangcePageModule)
  },
  { path: 'xiangceimgs/:ID', loadChildren: './pages/xiangce/xiangceimgs/xiangceimgs.module#XiangceimgsPageModule' },

  // {
  //   path: 'worktab',
  //   loadChildren: () => import('./worktab/worktab.module').then( m => m.WorktabPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
