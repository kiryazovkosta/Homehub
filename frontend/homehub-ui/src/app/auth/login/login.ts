import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  buttonText = 'Вход';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.buttonText = 'Изпращане...';

      // Simulate API call
      setTimeout(() => {
        this.buttonText = 'Успешно!';

        // Change button color temporarily
        const button = document.querySelector('.btn-primary') as HTMLElement;
        if (button) {
          button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }

        setTimeout(() => {
          this.buttonText = 'Вход';
          this.isLoading = false;
          if (button) {
            button.style.background = '';
          }
          this.loginForm.reset();
        }, 2000);
      }, 1500);
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

