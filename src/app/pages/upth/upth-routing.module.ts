import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpthPage } from './upth.page';

const routes: Routes = [
  {
    path: '',
    component: UpthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpthPageRoutingModule {}
