import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SmartLoader, ErrorMessage } from "../../shared";
import { AuthService } from '../../core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { processError } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  imports: [SmartLoader, ErrorMessage, ReactiveFormsModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.scss'
})
export class RecoverPassword {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = signal<boolean>(false);
  errorMessage = signal<string|null>(null);
  buttonText = signal<string>("Възстанови");
  passwordsMatch = signal<boolean>(false);

  recoverPasswordForm: FormGroup;

  constructor() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: [],
      firstName: [],
      lastName: [],
      password: [],
      confirmPassword: []
    });
  }

  closeError() {
    this.errorMessage.set(null); 
  }

    checkPasswordMatch(fg: FormGroup): void {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    this.passwordsMatch.set(password === confirmPassword && password !== "");

    if (confirmPassword && !this.passwordsMatch) {
      fg.get('confirmPassword')?.setErrors({ mismatch: true });
    } else if (confirmPassword && this.passwordsMatch()) {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.recoverPasswordForm.valid) {
      console.log('form is valid!');
      console.log(this.recoverPasswordForm.value);
      this.authService.recoverPassword(this.recoverPasswordForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(processError(err));
        }
      });
    }
  }

}
