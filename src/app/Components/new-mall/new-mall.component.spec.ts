import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMallComponent } from './new-mall.component';

describe('NewMallComponent', () => {
  let component: NewMallComponent;
  let fixture: ComponentFixture<NewMallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
