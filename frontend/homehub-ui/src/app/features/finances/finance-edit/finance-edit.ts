import { Component, computed, effect, inject, signal } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { CategorySimpleResponse, EnumMemberResponse, FinanceResponse } from '../../../models';
import { AuthService, FinancesService } from '../../../core/services';
import { ErrorMessage } from "../../../shared";

@Component({
  selector: 'app-finance-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './finance-edit.html',
  styleUrl: './finance-edit.scss'
})
export class FinanceEdit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly financesService = inject(FinancesService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private routeParams = toSignal(this.route.params);
  financeId = computed(() => {
    const params = this.routeParams();
    return params?.['id'];
  });

  financeRecord = signal<FinanceResponse|null>(null);
  types = signal<EnumMemberResponse[] | null>(null);
  categories = signal<CategorySimpleResponse[] | null>(null);
  loading = signal<boolean>(false);
  errorMessage = signal<string|null>(null);

  editFinanceForm: FormGroup;

  readonly userId = computed( () => this.authService.getUserId());

  constructor() {
    this.loadTypes();
    this.loadCategories();
    this.editFinanceForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', [Validators.required]]
    });

    effect(() => {
      this.loading.set(true);
      this.errorMessage.set(null);
      const id = this.financeId();
      if (id) {
        this.financesService.getFinance(id).subscribe({
          next: (response: FinanceResponse) => {
            if (!this.isCreator(response.userId)) {
              this.loading.set(false);
              this.errorMessage.set("Нямате достъп до избрания ресурс. Можете да редактирате само собствените си финансови записи.");
            }
            else {
              this.financeRecord.set(response);
              this.editFinanceForm.patchValue({
                id: response.id,
                title: response.title,
                description: response.description,
                type: response.type,
                categoryId: response.category?.id,
                amount: response.amount,
                date: response.date
              });
              this.loading.set(false);
              this.errorMessage.set(null);
            }
          },
          error: (err) => {
            console.log('API error:', err);
            this.loading.set(false);
            this.errorMessage.set("Възникна проблем при извличането на данните!");
          }
        });
      }
    });
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

  onSubmit(): void {
    if (this.editFinanceForm.valid) {
      this.loading.set(true);
      console.log('Form submitted:', this.editFinanceForm.value);

      this.financesService.update(this.editFinanceForm.value).subscribe({
        next: () => {
          this.loading.set(false);
          this.errorMessage.set(null);
          this.router.navigate([`/finances/${this.financeId()}`])
        },
        error: (err) => {
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
      })
    }
  }

  onErrorClose(): void {
    this.errorMessage.set(null);
  }

  isFormValid(): boolean {
    return this.editFinanceForm.valid;
  }

  isCreator(userId: string): boolean {
    return userId === this.userId();
  }
}
