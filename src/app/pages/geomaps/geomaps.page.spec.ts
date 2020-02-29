import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeomapsPage } from './geomaps.page';

describe('GeomapsPage', () => {
  let component: GeomapsPage;
  let fixture: ComponentFixture<GeomapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeomapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeomapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
