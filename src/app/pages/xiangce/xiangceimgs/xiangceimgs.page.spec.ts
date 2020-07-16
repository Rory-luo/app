import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XiangceimgsPage } from './xiangceimgs.page';

describe('XiangceimgsPage', () => {
  let component: XiangceimgsPage;
  let fixture: ComponentFixture<XiangceimgsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiangceimgsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XiangceimgsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
