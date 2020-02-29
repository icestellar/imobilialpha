import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DtldetailsPage } from './dtldetails.page';

describe('DtldetailsPage', () => {
  let component: DtldetailsPage;
  let fixture: ComponentFixture<DtldetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtldetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DtldetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
