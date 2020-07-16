import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddxiangceComponent } from './addxiangce.component';

describe('AddxiangceComponent', () => {
  let component: AddxiangceComponent;
  let fixture: ComponentFixture<AddxiangceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddxiangceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddxiangceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
