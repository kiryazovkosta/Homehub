import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  buttonText = 'Вход';
  errorMessage = '';
  showError = false;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  closeError(): void {
    this.showError = false;
    this.errorMessage = '';
    this.changeDetectorRef.markForCheck();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.buttonText = 'Изпращане...';
      this.showError = false;
      this.errorMessage = '';

      const loginResponse$ = this.authService.login(this.loginForm.value);
      loginResponse$.subscribe({
        next: (success: boolean) => {
          if (success) {
            this.buttonText = 'Успешно!';
            this.isLoading = false;
            this.changeDetectorRef.markForCheck();
            
            // Change button color for success
            const button = document.querySelector('.btn-primary') as HTMLElement;
            if (button) {
              button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            }

            // Navigate immediately
            this.router.navigate(['/about']);
            
          } else {
            // Show error message
            this.errorMessage = 'Невалиден логин или парола!';
            this.showError = true;
            this.buttonText = 'Вход';
            this.isLoading = false;
            this.changeDetectorRef.markForCheck();
          }
        },
        error: (error) => {
          // Handle unexpected errors (network issues, server errors, etc.)
          console.error('Login error caught:', error);
          this.errorMessage = 'Възникна грешка при свързването със сървъра!';
          this.showError = true;
          this.buttonText = 'Вход';
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
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

