import { Component, effect, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { FamilyResponse } from '../../../models/families/family-response.model';
import { PaginationListResponse } from '../../../models';
import { ConfirmDialog } from "../../../shared/confirm-dialog/confirm-dialog";
import { ErrorMessage } from "../../../shared/error-message/error-message";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateFamilyRequest, UpdateFamilyRequest } from '../../../models/families/create-family-request.model';

@Component({
  selector: 'app-families',
  imports: [ConfirmDialog, ErrorMessage, ReactiveFormsModule],
  templateUrl: './families.html',
  styleUrl: './families.scss'
})
export class Families {
  private readonly fb: FormBuilder = inject(FormBuilder);

  private readonly adminService: AdminService = inject(AdminService);

  readonly families = signal<FamilyResponse[]>([]);
  readonly reloadTrigger = signal<number>(0);

  readonly loading = signal(true);
  readonly errorMessage = signal<string|null>(null);

  isDeleted = signal<boolean>(false);
  isAdding = signal<boolean>(false);
  selectedFamilyId = signal<string | null>(null);

  createFamilyForm = signal<FormGroup | null>(null);
  editFamilyForm = signal<FormGroup | null>(null);

  add() {
    const form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(265)]],
    });

    this.isAdding.set(true);
    this.createFamilyForm.set(form);
  }

  save() {
    if (this.createFamilyForm()?.valid) {
      this.loading.set(true);
      const family = this.createFamilyForm()?.value;
      this.adminService.createFamily(family).subscribe({
        next: (response: FamilyResponse) => {
          this.isAdding.set(false);
          this.createFamilyForm.set(null);
          this.loading.set(false);
          this.reloadTrigger.update(trigger => trigger + 1);
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set("Възникна проблем при извличането на данните!");
        }
      });
    }
  }

  closeAdd() {
    this.isAdding.set(false);
    this.createFamilyForm.set(null);
  }

  constructor() {
    effect(() => {
      this.reloadTrigger();
      this.loading.set(true);
      this.errorMessage.set(null);
      this.adminService.getFamilies().subscribe({
        next: (paginationResponse: PaginationListResponse<FamilyResponse>) => {
          this.families.set(paginationResponse.items);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set("Възникна проблем при извличането на данните!");
        }
      });
    });
  }

  closeError() {
    this.errorMessage.set(null);
  }

  setDeleteMode(id: string) {
    this.selectedFamilyId.set(id);
    this.isDeleted.set(true);
  }

  closeDelete() {
    this.isDeleted.set(false);
  }

  isEditing(familyId: string): boolean {
    return this.selectedFamilyId() === familyId;
  }
  
  edit(family: FamilyResponse) {
    const form = this.fb.group({
      name: [family.name, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      description: [family.description, [Validators.required, Validators.minLength(2), Validators.maxLength(265)]],
    });

    this.selectedFamilyId.set(family.id);
    this.editFamilyForm.set(form);
  }

  update() {
    if (this.editFamilyForm()?.valid) {
      this.loading.set(true);
      const familyId = this.selectedFamilyId();
      const updateRequest: UpdateFamilyRequest = {
        ...this.editFamilyForm()?.value,
        id: familyId
      }

      this.adminService.updateFamily(updateRequest).subscribe({
        next: () => {
          this.loading.set(false);
          this.selectedFamilyId.set(null);
          this.editFamilyForm.set(null);
          this.reloadTrigger.update(trigger => trigger + 1);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set("Възникна проблем при редактирането на информацията за семейството!");
          this.loading.set(false);
        }
      })
    }

  }

  cancelEdit() {
    this.selectedFamilyId.set(null);
    this.editFamilyForm.set(null);
  }

  delete() {
    this.isDeleted.set(true);
    const familyId = this.selectedFamilyId();
    this.adminService.deleteFamily(familyId ?? '').subscribe({
      next: () => {
        this.isDeleted.set(false);
        this.selectedFamilyId.set(null);
        this.loading.set(true);
        this.reloadTrigger.update(trigger => trigger + 1);
      },
      error: (err) => {
        console.log(err);
        this.isDeleted.set(false);
        this.selectedFamilyId.set(null);
        this.errorMessage.set("Възникна проблем при изтриването на записа!")
      }
    })
  }
}
