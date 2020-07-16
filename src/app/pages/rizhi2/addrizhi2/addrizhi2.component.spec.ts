import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Addrizhi2Component } from './addrizhi2.component';

describe('Addrizhi2Component', () => {
  let component: Addrizhi2Component;
  let fixture: ComponentFixture<Addrizhi2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Addrizhi2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Addrizhi2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
