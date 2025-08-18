import { Component, signal, inject, input, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthService, FinancesService } from '../../../core/services';
import { FinanceResponse } from '../../../models';
import { ErrorMessage, ConfirmDialog } from "../../../shared";
import { 
  FinanceSignPipe, 
  FinanceCssClassPipe, 
  SliceTextPipe, 
  FinanceStatusTextPipe, 
  FinanceStatusClassPipe 
} from "../../../core/pipes";

@Component({
  selector: 'app-finance-item',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ErrorMessage, 
    ConfirmDialog, 
    FinanceSignPipe, 
    FinanceCssClassPipe, 
    SliceTextPipe, 
    FinanceStatusTextPipe, 
    FinanceStatusClassPipe
  ],
  templateUrl: './finance-item.html',
  styleUrl: './finance-item.scss'
})
export class FinanceItem {
  private readonly authService: AuthService = inject(AuthService);
  private readonly financesService: FinancesService = inject(FinancesService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  id = input<string>();

  private routeParams = toSignal(this.route.params);
  routeId = computed(() => {
    const params = this.routeParams();
    return params?.['id'];
  });

  effectiveId = computed(() => this.id() || this.routeId());
  
  financeRecord = signal<FinanceResponse|null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  delete = signal<boolean>(false);

  readonly userId = computed( () => this.authService.getUserId());
  
  constructor() {

    effect(() => {
      this.loading.set(true);
      this.error.set(null);
      const id = this.effectiveId();
      if (id) {
        this.financesService.getFinance(id).subscribe({
          next: (response: FinanceResponse) => {
            this.financeRecord.set(response);
            this.loading.set(false);
            this.error.set(null);
          },
          error: () => {
            this.loading.set(false);
            this.error.set("Възникна проблем при извличането на данните!")
          }
        });
      }
    });
  }

  onBack(): void {
  }

  setDeleteMode(): void {
    this.delete.set(true);
  }

  isBeforeOrAfterToday(date: string | Date | null | undefined): number {
    if (!date) {
      return 0;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    if (compareDate < today) return -1;
    if (compareDate > today) return 1;
    return 0;
  }

  closeError(): void {
    this.error.set(null);
  }

  closeDelete(): void {
    this.delete.set(false);
  }

  deleteFinance(): void {
    console.log(`Deleting: ${this.effectiveId()}`);
    this.financesService.delete(this.effectiveId()).subscribe({
      next: () => {
        this.delete.set(false);
        this.error.set(null);
        console.log(`Deleted: ${this.effectiveId()}`);
        this.router.navigate(['/finances']);
      },
      error: (err) => {
        this.delete.set(false);
        this.error.set("Възникна проблем при изтриването на този запис!")
      }
    })
  }

  ngAfterViewInit(): void {
    this.addHoverEffects();
    this.addKeyboardNavigation();
  }

  isCreator(userId: string): boolean {
    return userId === this.userId();
  }

  private addHoverEffects(): void {
    const buttons = document.querySelectorAll('.btn-edit-detail, .btn-delete, .btn-back');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        (button as HTMLElement).style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', () => {
        (button as HTMLElement).style.transform = '';
      });
    });
  }

  private addKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      if (e.target && (e.target as HTMLElement).closest('.finance-detail-section')) {
        if (e.key === 'Escape') {
          this.onBack();
        }
      }
    });
  }
}