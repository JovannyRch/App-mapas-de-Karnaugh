import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GridPageRoutingModule } from './grid-routing.module';
import { GridItemComponent } from '../../components/grid-item/grid-item.component';
import { GridPage } from './grid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GridPageRoutingModule
  ],
  declarations: [GridPage, GridItemComponent]
})
export class GridPageModule { }
