import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaPage } from './tabla.page';

const routes: Routes = [
  {
    path: '',
    component: TablaPage,
    children: [
      {
        path: 'grid',
        loadChildren: () => import('../grid/grid.module').then(m => m.GridPageModule)
      },
      {
        path: 'truthtable',
        loadChildren: () => import('../truthtable/truthtable.module').then(m => m.TruthtablePageModule)
      },
    ],

  },
  {
    path: '',
    redirectTo: '/app/pages/tabla/grid',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaPageRoutingModule { }
