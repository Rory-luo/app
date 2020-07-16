import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RizhiPage } from './rizhi.page';

describe('RizhiPage', () => {
  let component: RizhiPage;
  let fixture: ComponentFixture<RizhiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RizhiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RizhiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
