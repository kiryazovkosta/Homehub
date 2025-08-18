import { Component, signal, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CategorySimpleResponse, InventoryResponse, LocationResponse, SupabaseResponse } from '../../../models';
import { ErrorMessage, ConfirmDialog } from "../../../shared";
import { processError } from '../../../utils';
import { InventoriesService, LocationsService , ImagesServices } from '../../../core/services';

@Component({
  selector: 'app-inventory-item',
  imports: [ErrorMessage, ConfirmDialog, ReactiveFormsModule],
  templateUrl: './inventory-item.html',
  styleUrls: ['./inventory-item.scss']
})
export class InventoryItem implements OnInit {
  private readonly inventoryService = inject(InventoriesService);
  private readonly locationsService = inject(LocationsService);
  private readonly imagesServices = inject(ImagesServices);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  inventoryId = signal<string | null>(null);
  isEdit = signal<boolean>(false);
  isDeleted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  inventory = signal<InventoryResponse | null>(null);
  categories = signal<CategorySimpleResponse[] | null>(null);
  locations = signal<LocationResponse[] | null>(null);
  originalImage = signal<string | null>(null);

  inventoryEditForm: FormGroup;

  selectedFile = signal<File | null>(null);

  constructor(private fb: FormBuilder) {
    this.inventoryEditForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(256)]],
      categoryId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      threshold: [0, [Validators.required, Validators.min(0)]]
    });

    effect(() => {
      const inv = this.inventory();
      const cats = this.categories();
      const locs = this.locations();

      if (this.isEdit()) {
        this.inventoryEditForm.enable();
        this.selectedFile.set(null);
      } else {
        this.inventoryEditForm.disable();
      }

      if (inv && cats?.length && locs?.length) {
        this.setFormValues(inv);
      }
    });
  }

  ngOnInit() {
    this.isEdit.set(this.route.snapshot.url.some(segment => segment.path === 'edit'));

    this.loadCategories();
    this.loadLocations();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.inventoryId.set(id);

      if (id) {
        this.loadInventoryData(id);
      }
    });
  }

  private loadInventoryData(id: string) {
    console.log("loadInventoryData")

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.inventoryService.getInventory(id).subscribe({
      next: (response: InventoryResponse) => {
        this.inventory.set(response);
        this.originalImage.set(response.imageUrl);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.errorMessage.set(processError(err));
      }
    });
  }

  private setFormValues(inventory: InventoryResponse) {
    this.inventoryEditForm.patchValue({
      id: inventory.id,
      name: inventory.name,
      description: inventory.description,
      categoryId: inventory.category.id,
      locationId: inventory.location.id,
      quantity: inventory.quantity,
      threshold: inventory.threshold
    });
  }

  hasFileSelected(input: HTMLInputElement): boolean {
    return input.files !== null && input.files.length > 0;
  }

  getSelectedFileName(): string | null {
    return this.selectedFile() ? this.selectedFile()!.name : null;
  }

  onFileSelected(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    if (this.hasFileSelected(input)) {
      this.selectedFile.set(input.files![0]);
    } else {
      this.selectedFile.set(null);
    }
  }

  hasSelectedFile(): boolean {
    return this.selectedFile() !== null;
  }

  closeErrorMessage() {
    this.errorMessage.set(null);
  }

  closeDeleteDialog() {
    console.log('cancel deletion....');
    this.isDeleted.set(false);
  }

  delete() {
    this.inventoryService.delete(this.inventoryId() ?? '').subscribe({
      next: () => {
        this.isDeleted.set(true);
        this.errorMessage.set(null);
        console.log(`Deleted: ${this.inventoryId()}`);
        this.router.navigate(['/inventories']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set(processError(err));
      }
    });
  }

  cancel() {
    this.isEdit.set(false);
    const inv = this.inventory();
    if (inv) {
      this.setFormValues(inv);
      this.inventoryEditForm.disable();
    }

    this.selectedFile.set(null);
  }

    update() {
    console.log("Updating...");
    if (this.inventoryEditForm.valid && this.isEdit()) {
      console.log(this.inventoryEditForm.value);
       
      if (this.hasSelectedFile()) {
        console.log("Update with a new image");
        this.imagesServices.uploadProductToSupabase(this.selectedFile()!).subscribe({
          next: (response: SupabaseResponse) => {
            if (response.isSuccess) {
              console
              this.updateInventory(response.url);
            } else {
              console.error('Failed to upload image');
              this.errorMessage.set('Failed to upload image');
            }
          },
          error: (err) => {
            console.error('Error uploading image:', err);
            this.errorMessage.set('Error uploading image');
          }
        });
      } else {
        console.log("Update with a original image");
        this.updateInventory(this.originalImage());
      }
    }
  }

  private updateInventory(imageUrl: string | null) {
    console.log(imageUrl);

    this.inventoryService.update(
      this.inventoryId() ?? "",
      {
        ...this.inventoryEditForm.value,
        imageUrl: imageUrl
      }
    ).subscribe({
      next: () => {
        console.log('Inventory updated successfully');
        this.isEdit.set(false);
        if (this.inventoryId()) {
          this.loadInventoryData(this.inventoryId()!);
        }

        this.isEdit.set(false);
      },
      error: (err) => {
        console.error('Error updating inventory:', err);
        this.errorMessage.set(processError(err));
      }
    });
  }

  private loadCategories() {
    console.log("loadCategories");
    this.inventoryService.getCategories().subscribe({
      next: (res) => this.categories.set(res),
      error: () => this.categories.set([]),
    });
  }

  private loadLocations() {
    console.log("loadLocations");
    this.locationsService.getLocations().subscribe({
      next: (res) => this.locations.set(res),
      error: () => this.locations.set([]),
    });
  }
}