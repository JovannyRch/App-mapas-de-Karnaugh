import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  {
    path: 'tabla',
    loadChildren: () => import('./pages/tabla/tabla.module').then(m => m.TablaPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./pages/grid/grid.module').then( m => m.GridPageModule)
  },
  {
    path: 'truthtable',
    loadChildren: () => import('./pages/truthtable/truthtable.module').then( m => m.TruthtablePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
