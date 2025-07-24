import { ChangeDetectionStrategy, Component, effect, inject, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { familyRoleLabels } from '../../models/auth/register-user-request.model';
import { UpdateUserRequest } from '../../models/users/update-user-request.model';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile {
  protected userProfileForm: FormGroup;
  protected isLoading: boolean = false;
  protected selectedFile: File|null = null;
  protected fileUploadText: string = 'Избери файл (изображение)';
  protected usersService: UsersService = inject(UsersService);
  protected fb: FormBuilder = inject(FormBuilder);

  userProfileSignal = toSignal(this.usersService.getMyInfo());

  // Добавете computed signals за изображението
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
  }

  onFilesChange(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFile = files[0];

    if (files.length > 0) {
      this.fileUploadText = `Избран файл: ${files[0].name}`;
    } else {
      this.fileUploadText = 'Избери файлове (PDF, DOC, изображения, ZIP)';
    }
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      console.log(this.userProfileForm.value)
      this.isLoading = true;

      const updateUserRequest: UpdateUserRequest = {
        id: this.userProfileForm.get("id")?.value,
        firstName: this.userProfileForm.get("firstName")?.value,
        lastName: this.userProfileForm.get("lastName")?.value,
        description: this.userProfileForm.get("description")?.value, 
        familyRole: this.userProfileForm.get("familyRole")?.value, 
        imageUrl: this.userProfileForm.get("imageUrl")?.value
      };

      console.log(updateUserRequest);

      this.usersService.updateMyInfo(updateUserRequest).subscribe((d) => {
        console.log(d);
      })
      
      this.editMode.set(false);

      this.isLoading = false;
    } else {
      this.markFormGroupTouched(this.userProfileForm);
    }
  }

  cancelEdit(): void {
    this.editMode.set(false);
    this.userProfileForm.reset(this.userProfileSignal());
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