import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { 
  RegisterUserRequest, 
  FamilyRole, 
  familyRoleLabels, 
  SupabaseResponse, 
  FamiliesResponse, 
  FamilyItemResponse, 
  UserSimplyResponse 
} from '../../../models';
import { AdminService, ImagesServices, FamilyService } from '../../../core/services';
import { ErrorMessage } from "../../../shared";

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss'
})
export class AddUser {
  registerForm: FormGroup;
  loading = signal<boolean>(false);
  buttonText = signal<string>("Добави потребител");
  fileName = signal<string>("");
  passwordsMatch = signal<boolean>(false);
  selectedFile = signal<File|null>(null);
  errorMessage = signal<string|null>(null);
  families = signal<FamilyItemResponse[] | null>(null);

  familyRoleOptions = signal<{ value: number, label: string }[]>(
    Object.entries(familyRoleLabels).map(([value, label]) => ({
      value: Number(value),
      label
    }))
  );

  added = output<void>();

  private adminService: AdminService = inject(AdminService);
  private imagesService: ImagesServices = inject(ImagesServices);
  private familyService: FamilyService = inject(FamilyService);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      familyRole: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(256)]],
      familyId: ['', [Validators.required]],
    });
    this.loadFamilyRoles();
  }

  loadFamilyRoles() {
    this.familyService.getFamilies().subscribe({
      next: (families: FamiliesResponse) => this.families.set(families.items),
      error: () => this.families.set([]),
    });
  }

  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  checkPasswordMatch(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    this.passwordsMatch.set(password === confirmPassword && password !== "");

    if (confirmPassword && !this.passwordsMatch()) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else if (confirmPassword && this.passwordsMatch()) {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName.set(file.name);
      this.selectedFile.set(file);
    }
  }

  closeError(): void {
    this.errorMessage.set(null);
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.loading.set(true);
      this.errorMessage.set(null);

      if (this.selectedFile()) {
        this.buttonText.set('Качване на снимка...');
        
        const uploadResponse$ = this.imagesService.uploadImagesToSupabase(this.selectedFile()!);
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
    this.buttonText.set("Добавяне...");
    
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

    const registeredResponse$ = this.adminService.registerUser(registerRequest);
    registeredResponse$.subscribe({
      next: (resoinse: UserSimplyResponse) => {
        this.buttonText.set('Добави потребител');
        this.loading.set(false);
        this.registerForm.reset();
        this.fileName.set("");
        this.passwordsMatch.set(false);
        this.selectedFile.set(null);
        this.added.emit();
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        this.handleError('Възникна грешка при добавянето на потребителя!');
      }
    });
  }

  private handleError(message: string): void {
    this.errorMessage.set(message);
    this.buttonText.set("Добави потребител");
    this.loading.set(false);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  cancel(): void {
    console.log("cancel creation");
    this.added.emit();
  }
}
