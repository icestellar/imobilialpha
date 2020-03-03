import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpthPageRoutingModule } from './upth-routing.module';

import { UpthPage } from './upth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpthPageRoutingModule
  ],
  declarations: [UpthPage]
})
export class UpthPageModule {}
