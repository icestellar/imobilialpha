import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditdtlPage } from './auditdtl.page';

describe('AuditdtlPage', () => {
  let component: AuditdtlPage;
  let fixture: ComponentFixture<AuditdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditdtlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
