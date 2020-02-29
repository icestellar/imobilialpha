import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeomapsPage } from './geomaps.page';

const routes: Routes = [
  {
    path: '',
    component: GeomapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeomapsPageRoutingModule {}
