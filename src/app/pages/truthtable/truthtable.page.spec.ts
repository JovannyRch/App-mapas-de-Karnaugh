import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TruthtablePage } from './truthtable.page';

describe('TruthtablePage', () => {
  let component: TruthtablePage;
  let fixture: ComponentFixture<TruthtablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruthtablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TruthtablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
