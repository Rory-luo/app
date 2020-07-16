import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XiangcePage } from './xiangce.page';

describe('XiangcePage', () => {
  let component: XiangcePage;
  let fixture: ComponentFixture<XiangcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiangcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XiangcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
