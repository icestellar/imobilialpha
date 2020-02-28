import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpldetailsPage } from './epldetails.page';

describe('EpldetailsPage', () => {
  let component: EpldetailsPage;
  let fixture: ComponentFixture<EpldetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpldetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpldetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
