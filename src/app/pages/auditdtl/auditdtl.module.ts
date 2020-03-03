import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditdtlPageRoutingModule } from './auditdtl-routing.module';

import { AuditdtlPage } from './auditdtl.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditdtlPageRoutingModule
  ],
  declarations: [AuditdtlPage]
})
export class AuditdtlPageModule {}
