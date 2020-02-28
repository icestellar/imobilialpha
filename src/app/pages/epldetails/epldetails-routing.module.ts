import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpldetailsPage } from './epldetails.page';

const routes: Routes = [
  {
    path: '',
    component: EpldetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpldetailsPageRoutingModule {}
