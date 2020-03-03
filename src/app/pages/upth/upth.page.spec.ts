import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpthPage } from './upth.page';

describe('UpthPage', () => {
  let component: UpthPage;
  let fixture: ComponentFixture<UpthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
