import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddimgComponent } from './addimg.component';

describe('AddimgComponent', () => {
  let component: AddimgComponent;
  let fixture: ComponentFixture<AddimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddimgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
