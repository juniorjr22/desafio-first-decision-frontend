import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  userForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              public userService: UserService) {
    this.buildForm();
  }

  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe(
        () => {
          this.userForm.reset();
          this.showMessage('Usuário cadastrado com sucesso!');
        },
        (error) => {
          this.showMessage('Erro ao criar usuário!');
        }
      );
    }
  }

  private showMessage(msg: string): void {
    alert(msg);
  }

  isValidPasswordConfirmation() {
    if (this.userForm?.get('password')?.value !== this.userForm.get('passwordConfirmation')?.value) {
      return false;
    } else {
      return true;
    }
  }
}
