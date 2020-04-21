import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaPage } from './tabla.page';

describe('TablaPage', () => {
  let component: TablaPage;
  let fixture: ComponentFixture<TablaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
