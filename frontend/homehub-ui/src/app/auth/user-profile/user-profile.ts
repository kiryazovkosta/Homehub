import { ChangeDetectionStrategy, Component, effect, inject, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

import { UsersService } from '../../core/services';
import { ErrorMessage } from "../../shared";
import { familyRoleLabels, UpdateUserRequest, UserProfileResponse } from '../../models';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, ErrorMessage],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile {
  protected usersService: UsersService = inject(UsersService);
  protected fb: FormBuilder = inject(FormBuilder);

  userProfileForm: FormGroup;
  loading = signal<boolean>(false);
  selectedFile = signal<File|null>(null);
  fileUploadText = signal<string>('Избери файл (изображение');
  errorMessage = signal<string|null>(null);
  userProfileSignal = signal<UserProfileResponse | null>(null);

  profileImageUrl = computed(() => {
    const userProfile = this.userProfileSignal();
    return userProfile?.imageUrl || null;
  });

  hasProfileImage = computed(() => {
    const imageUrl = this.profileImageUrl();
    return imageUrl && imageUrl.trim() !== '';
  });

  editMode = signal<boolean>(false);

  readonly familyRoles = signal(Object.entries(familyRoleLabels));

  constructor() {
    this.userProfileForm = this.fb.group({
      id: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      familyRole: [''],
      familyRoleValue: [''],
      description: [''],
      imageUrl: [''],
      familyGroup: this.fb.group({
        familyId: [''],
        familyName: [''],
        familyDescription: ['']
      }),
    });

    this.usersService.getMyInfo().subscribe(userProfile => {
      this.userProfileSignal.set(userProfile);
    });

    effect(() => {
      const userProfile = this.userProfileSignal();
      if (userProfile) {
        console.log(userProfile);
        this.userProfileForm.patchValue({
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          familyRole: userProfile.familyRole,
          familyRoleValue: userProfile.familyRoleValue,
          description: userProfile.description,
          imageUrl: userProfile.imageUrl,
          familyGroup: {
            familyId: userProfile.family.id,
            familyName: userProfile.family.name,
            familyDescription: userProfile.family.description
          },
        });
      }
    });
  }

  enableEditMode() {
    this.editMode.set(true);
    this.addEditModeValidators();
  }

  onFilesChange(event: any): void {
    // const files = Array.from(event.target.files) as File[];
    // this.selectedFile = files[0];

    // if (files.length > 0) {
    //   this.fileUploadText = `Избран файл: ${files[0].name}`;
    // } else {
    //   this.fileUploadText = 'Избери файлове (PDF, DOC, изображения, ZIP)';
    // }
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      console.log(this.userProfileForm.value)
      this.loading.set(true);

      const updateUserRequest: UpdateUserRequest = {
        id: this.userProfileForm.get("id")?.value,
        firstName: this.userProfileForm.get("firstName")?.value,
        lastName: this.userProfileForm.get("lastName")?.value,
        description: this.userProfileForm.get("description")?.value,
        familyRole: this.userProfileForm.get("familyRole")?.value,
        imageUrl: this.userProfileForm.get("imageUrl")?.value
      };

      this.usersService
        .updateMyInfo(updateUserRequest)
        .pipe(switchMap(() => this.usersService.getMyInfo()))
        .subscribe({
          next: (updatedProfile: UserProfileResponse) => {
            console.log('Profile updated and refreshed successfully:', updatedProfile);
            this.errorMessage.set(null);
            this.editMode.set(false);
            this.loading.set(false);
            this.userProfileSignal.set(updatedProfile);

            this.userProfileForm.updateValueAndValidity();
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.loading.set(false);
            this.errorMessage.set("Възникна проблем при редактирането на потребителските данни!");
          }
        });
    } else {
      this.markFormGroupTouched(this.userProfileForm);
    }
  }

  cancelEdit(): void {
    this.editMode.set(false);
    this.userProfileForm.reset(this.userProfileSignal());

    this.userProfileForm.updateValueAndValidity();
  }

  closeError(): void {
    this.errorMessage.set(null);
  }

  private addEditModeValidators() {
    this.userProfileForm.get('firstName')?.addValidators([
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(64)
    ]);
    this.userProfileForm.get('lastName')?.addValidators([
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(64)
    ]);
    this.userProfileForm.get('description')?.addValidators([
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(512)
    ]);
    this.userProfileForm.get('familyRole')?.addValidators([
      Validators.required
    ]);

    this.userProfileForm.updateValueAndValidity();
  }

  private removeEditModeValidators() {
    this.userProfileForm.get('firstName')?.clearValidators();
    this.userProfileForm.get('lastName')?.clearValidators();
    this.userProfileForm.get('description')?.clearValidators();
    this.userProfileForm.get('familyRole')?.clearValidators();
    
    this.userProfileForm.updateValueAndValidity();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}