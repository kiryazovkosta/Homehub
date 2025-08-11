import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ImagesServices } from '../../../core/services/images.service';
import { SupabaseResponse } from '../../../models/common/supabase-response.model';
import { CategorySimpleResponse, LocationResponse } from '../../../models';
import { InventoriesService } from '../../../core/services/inventories.services';
import { LocationsService } from '../../../core/services';
import { processError } from '../../../utils/error.utils';
import { CreateInventoryRequest } from '../../../models/inventories/create-inventory-request.model';

@Component({
  selector: 'app-inventory-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './inventory-create.html',
  styleUrl: './inventory-create.scss'
})
export class InventoryCreate {
  private readonly imagesService: ImagesServices = inject(ImagesServices);
  private readonly inventoriesService: InventoriesService = inject(InventoriesService);
  private readonly locationsService: LocationsService = inject(LocationsService);
  private router: Router = inject(Router);
  
  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected createInventoryForm: FormGroup;

  errorMessage = signal<string|null>(null);

  selectedFile = signal<File|null>(null);
  imageUrl = signal<string|null>(null);

  categories = signal<CategorySimpleResponse[] | null>(null);
  locations = signal<LocationResponse[] | null>(null);

  constructor() {
    this.createInventoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      categoryId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      threshold: ['', [Validators.required, Validators.min(0)]],
      imageFile: [null, [Validators.required, this.fileValidator]]
    })
    this.loadCategories();
    this.loadLocations();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      this.createInventoryForm.patchValue({
        imageFile: file
      });
      this.createInventoryForm.get('imageFile')?.markAsTouched();

      this.selectedFile.set(file);
      this.imageUrl.set(URL.createObjectURL(file));
    }
  }

  submit() {
    if (this.createInventoryForm.valid) {
      const formData = this.createInventoryForm.value;
      this.imagesService.uploadProductToSupabase(this.selectedFile()!).subscribe({
        next: (response: SupabaseResponse) => {
          if (response.isSuccess) {
            console.log(response.url);
            const createInventory: CreateInventoryRequest = {
              name: formData.name.toString(),
              description: formData.description.toString(),
              categoryId: formData.categoryId.toString(),
              locationId: formData.locationId.toString(),
              quantity: Number(formData.quantity),
              threshold: Number(formData.threshold),
              imageUrl: response.url
            }
            this.inventoriesService.create(createInventory).subscribe({
              next: () => {
                console.log("success");
                this.errorMessage.set(null);
                this.router.navigate(["/inventories"]);
              },
              error: (err) => {
                console.log(err);
                this.errorMessage.set(processError(err));
              }
            })


          } else {
            console.log(response.error);
            this.errorMessage.set(response.error);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set(processError(err));
        }
      })
    }
    else {
      console.log('Form is invalid:', this.createInventoryForm.errors);
    }
  }

  private fileValidator(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);

    const file = control.value;
    if (!file) {
      return { required: true };
    }
    
    if (!(file instanceof File)) {
      return { invalidFile: true };
    }

    if (!file.type.startsWith('image/')) {
      return { invalidFileType: true };
    }
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      return { fileTooLarge: true };
    }
    
    return null;
  }

  private loadCategories() {
    this.inventoriesService.getCategories().subscribe({
      next: (categoriesResponse: CategorySimpleResponse[]) => this.categories.set(categoriesResponse),
      error: () => this.categories.set([]),
    });
  }

  private loadLocations() {
    this.locationsService.getLocations().subscribe({
      next: (locationsResponse: LocationResponse[]) => this.locations.set(locationsResponse),
      error: () => this.locations.set([]),
    });
  }


}
