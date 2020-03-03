import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditdtlPage } from './auditdtl.page';

const routes: Routes = [
  {
    path: '',
    component: AuditdtlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditdtlPageRoutingModule {}
