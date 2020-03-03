import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Geo1Page } from './geo1.page';

const routes: Routes = [
  {
    path: '',
    component: Geo1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Geo1PageRoutingModule {}
