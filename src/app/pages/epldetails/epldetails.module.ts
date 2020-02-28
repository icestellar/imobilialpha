import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpldetailsPageRoutingModule } from './epldetails-routing.module';

import { EpldetailsPage } from './epldetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpldetailsPageRoutingModule
  ],
  declarations: [EpldetailsPage]
})
export class EpldetailsPageModule {}
