import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddrizhiComponent } from './addrizhi.component';

describe('AddrizhiComponent', () => {
  let component: AddrizhiComponent;
  let fixture: ComponentFixture<AddrizhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrizhiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddrizhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
