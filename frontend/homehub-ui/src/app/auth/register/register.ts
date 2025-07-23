import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserRequest, FamilyRole } from '../../models/auth/register-user-request.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ImagesServices } from '../../core/services/images.service';
import { SupabaseResponse } from '../../models/common/supabase-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  buttonText = 'Регистрация';
  fileName = '';
  passwordsMatch = false;
  selectedFile: File | null = null;
  errorMessage = '';
  showError = false;

  private authService: AuthService = inject(AuthService);
  private imagesService: ImagesServices = inject(ImagesServices);
  private router: Router = inject(Router);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      familyRole: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(256)]],
      terms: [false, [Validators.requiredTrue]],
      familyId: ['', [Validators.required]],
    });
  }

  isFormValid(): boolean {
    return this.registerForm.valid;
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
      this.selectedFile = file;
    }
  }

  closeError(): void {
    this.showError = false;
    this.errorMessage = '';
    this.changeDetectorRef.markForCheck();
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.passwordsMatch) {
      this.isLoading = true;
      this.showError = false;
      this.errorMessage = '';

      if (this.selectedFile) {
        this.buttonText = 'Качване на снимка...';
        
        const uploadResponse$ = this.imagesService.uploadImagesToSupabase(this.selectedFile);
        uploadResponse$.subscribe({
          next: (uploadResponse: SupabaseResponse) => {
            if (uploadResponse.isSuccess) {
              this.proceedWithRegistration(uploadResponse.url);
            } else {
              this.handleError(`Грешка при качване на снимката: ${uploadResponse.error}`);
            }
          },
          error: (error: any) => {
            console.error('Upload error:', error);
            this.handleError('Възникна грешка при качването на снимката!');
          }
        });
      } else {
        this.proceedWithRegistration('https://cao.bg/Images/News/Large/person.jpg');
      }
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private proceedWithRegistration(imageUrl: string): void {
    this.buttonText = 'Регистриране...';
    
    const registerRequest: RegisterUserRequest = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      email: this.registerForm.value.email,
      familyRole: this.registerForm.value.familyRole as FamilyRole,
      description: this.registerForm.value.description,
      imageUrl: imageUrl,
      familyId: this.registerForm.value.familyId
    };

    console.log('Register request:', registerRequest);

    const registeredResponse$ = this.authService.register(registerRequest);
    registeredResponse$.subscribe({
      next: (success: boolean) => {
        if (success) {
          this.buttonText = 'Регистрация';
          this.isLoading = false;
          this.registerForm.reset();
          this.fileName = '';
          this.passwordsMatch = false;
          this.selectedFile = null;
          this.changeDetectorRef.markForCheck();

          const button = document.querySelector('.btn-primary') as HTMLElement;
          if (button) {
            button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
          }

          this.router.navigate(['/about']);
          
        } else {
          this.handleError('Възникна проблем при регистрирането. Моля опитайте отново!');
        }
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        this.handleError('Възникна грешка при свързването със сървъра!');
      }
    });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.showError = true;
    this.buttonText = 'Регистрация';
    this.isLoading = false;
    this.changeDetectorRef.markForCheck();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}