import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  buttonText = 'Регистрация';
  fileName = '';
  passwordsMatch = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  checkPasswordMatch(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.passwordsMatch = password === confirmPassword && password !== '';

    if (confirmPassword && !this.passwordsMatch) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else if (confirmPassword && this.passwordsMatch) {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.passwordsMatch) {
      this.isLoading = true;
      this.buttonText = 'Изпращане...';

      // Simulate API call
      //setTimeout(() => {
        this.buttonText = 'Успешно!';

        // Change button color temporarily
        const button = document.querySelector('.btn-primary') as HTMLElement;
        if (button) {
          button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }

        //setTimeout(() => {
          this.buttonText = 'Регистрация';
          this.isLoading = false;
          if (button) {
            button.style.background = '';
          }
          this.registerForm.reset();
          this.fileName = '';
          this.passwordsMatch = false;
        //}, 2000);
      //}, 1500);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}