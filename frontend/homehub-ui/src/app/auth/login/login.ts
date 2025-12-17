import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../core/services';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessage } from "../../shared";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessage, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm: FormGroup;
  loading = signal<boolean>(false);
  buttonText = signal<string>('Вход');
  errorMessage = signal<string|null>(null);

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false]
    });
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  closeError(): void {
    this.errorMessage.set(null);
    this.changeDetectorRef.markForCheck();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.buttonText.set("Изпращане...");
      this.errorMessage.set(null);

      const loginResponse$ = this.authService.login(this.loginForm.value);
      loginResponse$.subscribe({
        next: (success: boolean) => {
          if (success) {
            this.buttonText.set("Успешно!");
            this.loading.set(false);
            
            const button = document.querySelector('.btn-primary') as HTMLElement;
            if (button) {
              button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            }

            this.router.navigate(['/about']);
            
          } else {
            this.errorMessage.set("Невалиден логин, парола или нещо друго!");
            this.loading.set(false);
            this.buttonText.set('Вход');
          }
        },
        error: (error) => {
          console.error('Login error caught:', error);
          this.errorMessage.set('Възникна грешка при свързването със сървъра!');
          this.loading.set(false);
          this.buttonText.set('Вход');
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}

