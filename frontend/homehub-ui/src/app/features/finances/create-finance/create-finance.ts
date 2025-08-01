import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinancesService } from '../../../core/services';
import { CategorySimpleResponse, EnumMemberResponse } from '../../../models';
import { ErrorMessage } from "../../../shared/error-message/error-message";

@Component({
  selector: 'app-create-finance',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './create-finance.html',
  styleUrl: './create-finance.scss'
})
export class CreateFinance {
  private financesService: FinancesService = inject(FinancesService);
  private router: Router = inject(Router);
  protected formBuilder: FormBuilder = inject(FormBuilder);

  createFinanceForm: FormGroup;

  loading = signal<boolean>(false);
  errorMessage = signal<string|null>(null);
  types = signal<EnumMemberResponse[] | null>(null);
  categories = signal<CategorySimpleResponse[] | null>(null);


  constructor() {
    this.createFinanceForm = this.formBuilder.group({
       title: ['', [Validators.required, Validators.minLength(2)]],
       description: ['', [Validators.required, Validators.minLength(5)]],
       type: ['', [Validators.required]],
       categoryId: ['', [Validators.required]],
       amount: ['', [Validators.required, Validators.min(0.01)]],
       date: ['', [Validators.required]]
    });
    this.loadTypes();
    this.loadCategories();
  }

  loadTypes() {
    this.financesService.getTypes().subscribe({
      next: (types: EnumMemberResponse[]) => this.types.set(types),
      error: () => this.types.set([]),
    });
  }

  loadCategories() {
    this.financesService.getCategories().subscribe({
      next: (categories: CategorySimpleResponse[]) => this.categories.set(categories),
      error: () => this.categories.set([]),
    });
  }

  get isFormValid(): boolean {
    return this.createFinanceForm.valid;
  }

  onErrorClose(): void {
    this.errorMessage.set(null);
  }

  onSubmit() {
    console.log(this.createFinanceForm.value);

    if (this.createFinanceForm.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);
      this.financesService.create(this.createFinanceForm.value).subscribe({
        next: result => {
          console.log("success");
          this.loading.set(false);
          this.errorMessage.set(null);
          this.router.navigate(["/finances"]);
        },
        error: err => {
            console.log(err);
            let errorMessageText = 'An error occurred while creating the finance record.';
            
            if (err.error?.errors) {
              const validationErrors = Object.values(err.error.errors)
                .flat()
                .join('\n');
              errorMessageText = validationErrors;
            } else if (err.error?.detail) {
              errorMessageText = err.error.detail;
            } else if (err.error?.message) {
              errorMessageText = err.error.message;
            }
            
            this.errorMessage.set(errorMessageText);
            this.loading.set(false);
          }
      });
    }
  }
}