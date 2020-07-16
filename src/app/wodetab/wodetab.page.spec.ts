import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WodetabPage } from './wodetab.page';

describe('WodetabPage', () => {
  let component: WodetabPage;
  let fixture: ComponentFixture<WodetabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WodetabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WodetabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
