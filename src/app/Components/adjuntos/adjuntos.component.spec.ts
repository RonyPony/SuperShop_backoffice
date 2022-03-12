/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdjuntosComponent } from './adjuntos.component';

describe('AdjuntosComponent', () => {
  let component: AdjuntosComponent;
  let fixture: ComponentFixture<AdjuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
