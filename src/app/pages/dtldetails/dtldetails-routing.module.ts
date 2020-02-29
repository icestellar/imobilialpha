import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DtldetailsPage } from './dtldetails.page';

const routes: Routes = [
  {
    path: '',
    component: DtldetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DtldetailsPageRoutingModule {}
