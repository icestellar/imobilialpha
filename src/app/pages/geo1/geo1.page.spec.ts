import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Geo1Page } from './geo1.page';

describe('Geo1Page', () => {
  let component: Geo1Page;
  let fixture: ComponentFixture<Geo1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Geo1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Geo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
