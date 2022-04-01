import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTiendaComponent } from './edit-tienda.component';

describe('EditTiendaComponent', () => {
  let component: EditTiendaComponent;
  let fixture: ComponentFixture<EditTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
