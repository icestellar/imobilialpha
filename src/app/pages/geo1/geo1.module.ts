import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Geo1PageRoutingModule } from './geo1-routing.module';

import { Geo1Page } from './geo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Geo1PageRoutingModule
  ],
  declarations: [Geo1Page]
})
export class Geo1PageModule {}
