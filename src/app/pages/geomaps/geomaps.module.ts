import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeomapsPageRoutingModule } from './geomaps-routing.module';

import { GeomapsPage } from './geomaps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeomapsPageRoutingModule
  ],
  declarations: [GeomapsPage]
})
export class GeomapsPageModule {}
