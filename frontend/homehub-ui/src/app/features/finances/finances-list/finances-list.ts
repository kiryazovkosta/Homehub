import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { FinancesService } from '../../../core/services';
import { FinanceListResponse, PaginationListResponse } from '../../../models';
import { RouterLink } from '@angular/router';
import { PageNavigation } from "../../../shared/page-navigation/page-navigation";
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessage } from "../../../shared/error-message/error-message";

interface FinanceRecord {
  id: number;
  title: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
}

@Component({
  selector: 'app-finances-list',
  imports: [CommonModule, RouterLink, PageNavigation, ErrorMessage],
  templateUrl: './finances-list.html',
  styleUrl: './finances-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancesList {
  private readonly authService: AuthService = inject(AuthService);
  private readonly financesService: FinancesService = inject(FinancesService);

  readonly page = signal<number>(1);
  readonly pageSize = signal(6);

  readonly items = signal<FinanceListResponse[]>([]);
  readonly totalCount = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly hasPreviousPage = signal<boolean>(false);
  readonly hasNextPage = signal<boolean>(false);

  readonly loading = signal(true);
  readonly hasError = signal(false);
  readonly errorMessage = signal<string|null>(null);

  readonly isNotEmpty = computed(() => this.items().length > 0);

  readonly userId = computed( () => this.authService.getUserId());

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.hasError.set(false);
      this.errorMessage.set(null);

      const currentPage = this.page();
      const currentPageSize = this.pageSize();

      this.financesService.getFinances({ page: currentPage, pageSize: currentPageSize }).subscribe({
        next: (response: PaginationListResponse<FinanceListResponse>) => {
          this.items.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
          this.hasPreviousPage.set(response.hasPreviousPage);
          this.hasNextPage.set(response.hasNextPage);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.hasError.set(true);
          this.errorMessage.set("Възникна проблем при извличането на данните!")
        }
      });
    });
  }

  setPage(pageNumber: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Директно актуализирайте страницата без Router навигация
    this.page.set(pageNumber);
    this.animateCards();

    return false;
  }

  setPageSize(pageSize: number) {
    this.pageSize.set(pageSize);
  }

  next() {
    if (this.hasNextPage()) {
      this.page.set(this.page() + 1);
    }
  }

  prev() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }

  getTypeClass(item: number): string {
    return item === 1 ? 'income' : 'expense';
  }

  getTypeValue(item: number): string {
    return item === 1 ? 'Приход' : 'Разход';
  }

  getTypeSign(item: number): string {
    return item === 1 ? '+' : '-';
  }

  updatePagination(pageIndex: number): void {
    console.log(pageIndex);
    this.page.set(pageIndex);
    this.animateCards();
  }

  goToPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages() || pageNumber === this.page()) {
      return;
    }

    this.updatePagination(pageNumber);

    // // Scroll to top of section
    // const financeSection = document.getElementById('finance');
    // if (financeSection) {
    //   financeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
  }

  isCreator(item: FinanceListResponse): boolean {
    // Проверява дали текущият потребител е създател на записа
    return item.userId === this.userId();
  }

  closeError(): void {
    this.errorMessage.set(null);
  }

  private animateCards(): void {
    setTimeout(() => {
      3339
      const cards = document.querySelectorAll('.finance-card');
      cards.forEach((card, index) => {
        (card as HTMLElement).style.opacity = '0.5';
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
        }, 100 * index);
      });
    }, 0);
  }
}
