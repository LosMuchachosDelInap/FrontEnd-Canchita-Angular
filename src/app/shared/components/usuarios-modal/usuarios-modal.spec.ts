import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModal } from './usuarios-modal';

describe('UsuariosModal', () => {
  let component: UsuariosModal;
  let fixture: ComponentFixture<UsuariosModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
