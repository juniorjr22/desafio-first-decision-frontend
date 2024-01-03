import { TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockUserService = jasmine.createSpyObj('UserService', ['save']);

describe('FormComponent', () => {
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormComponent, { provide: UserService, useClass: mockUserService }]
    }).compileComponents();
  });
  
  it('should validate form and disable submit button when invalid', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const component = fixture.componentInstance;
    component.userService = userService;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);

    expect(component.userForm.valid).toBe(false);
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);

    component.userForm.get('name')?.setValue(''); // Empty name
    fixture.detectChanges();
    expect(component.userForm.valid).toBe(false);
    expect(fixture.nativeElement.querySelector('p.error-message').textContent).toContain('O nome é obrigatório');

    component.userForm.get('name')?.setValue('ab'); // Name too short
    fixture.detectChanges();
    expect(component.userForm.valid).toBe(false);
    expect(fixture.nativeElement.querySelector('p.error-message').textContent).toContain('O tamanho mínimo é 3 caracteres');

    component.userForm.get('email')?.setValue('invalid'); // Invalid email
    fixture.detectChanges();
    expect(component.userForm.valid).toBe(false);
    expect(fixture.nativeElement.querySelector('p.error-message').textContent).toContain('E-mail inválido');

    // Test valid form and button enabling
    component.userForm.patchValue({
      name: 'Junior',
      email: 'junior@gmail.com',
      password: 'password123',
      passwordConfirmation: 'password123'
    });
    fixture.detectChanges();
    expect(component.userForm.valid).toBe(true);
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(false);
  });
});
