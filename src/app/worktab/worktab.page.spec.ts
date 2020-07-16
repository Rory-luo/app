import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorktabPage } from './worktab.page';

describe('WorktabPage', () => {
  let component: WorktabPage;
  let fixture: ComponentFixture<WorktabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorktabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorktabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
