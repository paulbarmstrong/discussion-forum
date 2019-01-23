import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainForumComponent } from './main-forum.component';

describe('MainForumComponent', () => {
  let component: MainForumComponent;
  let fixture: ComponentFixture<MainForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
