import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DtldetailsPageRoutingModule } from './dtldetails-routing.module';

import { DtldetailsPage } from './dtldetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DtldetailsPageRoutingModule
  ],
  declarations: [DtldetailsPage]
})
export class DtldetailsPageModule {}
