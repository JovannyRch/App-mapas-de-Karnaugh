import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruthtablePageRoutingModule } from './truthtable-routing.module';

import { TruthtablePage } from './truthtable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruthtablePageRoutingModule
  ],
  declarations: [TruthtablePage]
})
export class TruthtablePageModule {}
