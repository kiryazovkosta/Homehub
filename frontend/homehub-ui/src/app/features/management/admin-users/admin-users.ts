import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AdminService, FamilyService } from '../../../core/services';
import { ConfirmDialog, ErrorMessage, PageNavigation } from "../../../shared";
import { AddUser } from '../add-user/add-user';

import { 
  UserAdminResponse, 
  PaginationListResponse, 
  familyRoleLabels, 
  FamiliesResponse, 
  FamilyItemResponse, 
  UpdateUserFromAdminRequest 
} from '../../../models';

@Component({
  selector: 'app-admin-users',
  imports: [ReactiveFormsModule, ConfirmDialog, ErrorMessage, PageNavigation, AddUser],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss'
})
export class AdminUsers {
  private readonly adminService: AdminService = inject(AdminService);
  private readonly familyService: FamilyService = inject(FamilyService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly page = signal<number>(1);
  readonly pageSize = signal(8);
  readonly reloadTrigger = signal<number>(0);

  readonly users = signal<UserAdminResponse[]>([]);
  readonly totalCount = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly hasPreviousPage = signal<boolean>(false);
  readonly hasNextPage = signal<boolean>(false);

  readonly editingUserId = signal<string | null>(null);
  readonly editForm = signal<FormGroup | null>(null);

  readonly loading = signal(true);
  readonly errorMessage = signal<string|null>(null);

  readonly familyRoles = signal(Object.entries(familyRoleLabels));

  families = signal<FamilyItemResponse[] | null>(null);

  isDeleted = signal<boolean>(false);

  isAdded = signal<boolean>(false);

  constructor() {
    this.loadFamilies();

    effect(() => {
      this.loading.set(true);
      this.errorMessage.set(null);

      const currentPage = this.page();
      const currentPageSize = this.pageSize();
      this.reloadTrigger();

      this.adminService.getUsers({ page: currentPage, pageSize: currentPageSize }).subscribe({
        next: (response: PaginationListResponse<UserAdminResponse>) => {
          console.log(response);
          const usersIsEditFalse = response.items.map(user => ({
            ...user,
            isEdit: false
          }));
          this.users.set(usersIsEditFalse);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
          this.hasPreviousPage.set(response.hasPreviousPage);
          this.hasNextPage.set(response.hasNextPage);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set("Възникна проблем при извличането на данните!");
        }
      });
    });
  }

  loadFamilies() {
    this.familyService.getFamilies().subscribe({
      next: (families: FamiliesResponse) => this.families.set(families.items),
      error: () => this.families.set([]),
    });
  }

  setPage(pageNumber: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.page.set(pageNumber);
    return false;
  }

  edit(user: UserAdminResponse) {
    const form = this.fb.group({
      firstName: [user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(2)]],
      familyRole: [user.familyRole.toString(), [Validators.required]],
      description: [user.description, [Validators.maxLength(500)]],
      imageUrl: [user.imageUrl],
      familyId: [user.familyId.toString(), Validators.required],
      password: ['']
    });

    this.editForm.set(form);
    this.editingUserId.set(user.id);
  }

  cancel() {
    this.editingUserId.set(null);
    this.editForm.set(null);
  }

  save(user: UserAdminResponse) {
    const form = this.editForm();
    if (form && form.valid) {
      const formValue = form.value;
      console.log('Form data:', formValue);

      const updateRequest: UpdateUserFromAdminRequest = {
        id: this.editingUserId()!,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        description: formValue.description || '',
        imageUrl: formValue.imageUrl || '',
        familyId: formValue.familyId,
        familyRole: parseInt(formValue.familyRole),
        password: formValue.password || null
      };

      this.loading.set(true);
      
      this.adminService.updateUser(updateRequest).subscribe({
        next: (response: string) => {
          console.log("Successfully updated:", response);
          this.editingUserId.set(null);
          this.editForm.set(null);
          this.loading.set(false);
          this.reloadTrigger.update(trigger => trigger + 1);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.errorMessage.set("Възникна проблем при обновяването на потребителя!");
          this.editingUserId.set(null);
          this.editForm.set(null);
          this.loading.set(false);
        }
      });
    } else {
      console.log('Form is invalid:', form?.errors);
      this.errorMessage.set("Невалидна форма");
    }
  }

  delete() {
    const userId = this.editingUserId();
    this.adminService.deleteUser(userId ?? '').subscribe({
      next: (response: void) => {
        this.isDeleted.set(false);
        this.editingUserId.set(null);
        this.editForm.set(null);
        this.loading.set(true);
        this.reloadTrigger.update(trigger => trigger + 1);
      },
      error: (err) => {
        console.log(err);
        this.isDeleted.set(false);
        this.editingUserId.set(null);
        this.editForm.set(null);
        this.errorMessage.set("Възникна проблем при изтриването на записа!")
      }
    })
  }

  isEditing(userId: string): boolean {
    return this.editingUserId() === userId;
  }

  getFormControl(controlName: string) {
    return this.editForm()?.get(controlName);
  }

  setDeletedMode() {
    this.isDeleted.set(true);
  }

  closeError() {
    this.errorMessage.set(null);
  }

  closeDelete() {
    this.isDeleted.set(false);
  }

  addingUser() {
    this.isAdded.set(true)
  }

  addedUser() {
    this.isAdded.set(false);
    this.reloadTrigger.update(trigger => trigger + 1);
  }
}