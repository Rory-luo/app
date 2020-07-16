import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Rizhi2Page } from './rizhi2.page';

describe('Rizhi2Page', () => {
  let component: Rizhi2Page;
  let fixture: ComponentFixture<Rizhi2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Rizhi2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Rizhi2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
