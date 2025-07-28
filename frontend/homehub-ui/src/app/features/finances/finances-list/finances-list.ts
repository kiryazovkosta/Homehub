import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { FinancesService } from '../../../core/services';
import { FinanceListResponse, PaginationListResponse } from '../../../models';
import { RouterLink } from '@angular/router';
import { PageNavigation } from "../../../shared/page-navigation/page-navigation";

interface FinanceRecord {
  id: number;
  title: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
}

@Component({
  selector: 'app-finances-list',
  imports: [CommonModule, RouterLink, PageNavigation],
  templateUrl: './finances-list.html',
  styleUrl: './finances-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancesList {
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

  readonly isNotEmpty = computed(() => this.items().length > 0);

  constructor() {
   effect(() => {
      this.loading.set(true);
      this.hasError.set(false);

      const currentPage = this.page();
      const currentPageSize = this.pageSize();

      this.financesService.getFinances({page: currentPage, pageSize: currentPageSize }).subscribe({
        next: (response: PaginationListResponse<FinanceListResponse>) => {  
          this.items.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
          this.hasPreviousPage.set(response.hasPreviousPage);
          this.hasNextPage.set(response.hasNextPage);
          this.loading.set(false);

          console.log(this.items())
          this.calculateVisiblePages();
        },
        error: () => {
          this.loading.set(false);
          this.hasError.set(true);
        }
      });
    }); 
  }

  setPage(pageNumber: number) {
    console.log(pageNumber)
    this.page.set(pageNumber);
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

  protected startIndex = (this.page() - 1) * this.pageSize();
  protected endIndex = Math.min(this.startIndex + this.pageSize(), this.totalCount());

  visiblePages: (number | string)[] = [];

  updatePagination(pageIndex: number): void {
    console.log(pageIndex);

    this.page.set(pageIndex);
    this.calculateVisiblePages();
    this.animateCards();
  }

  calculateVisiblePages(): void {
    const pages: (number | string)[] = [];

    if (this.totalPages() <= 5) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= this.totalPages(); i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (this.page() > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, this.page() - 1); i <= Math.min(this.totalPages() - 1, this.page() + 1); i++) {
        pages.push(i);
      }

      if (this.page() < this.totalPages() - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(this.totalPages());
    }

    this.visiblePages = pages;
  }

  goToPage(pageNumber: number | string): void {
    // Проверяваме дали page е число
    if (typeof pageNumber !== 'number') {
      return;
    }

    if (pageNumber < 1 || pageNumber > this.totalPages() || pageNumber === this.page()) {
      return;
    }

    this.updatePagination(pageNumber);

    // Scroll to top of section
    const financeSection = document.getElementById('finance');
    if (financeSection) {
      financeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private animateCards(): void {
    setTimeout(() => {
      const cards = document.querySelectorAll('.finance-card');
      cards.forEach((card, index) => {
        (card as HTMLElement).style.opacity = '0.5';
        setTimeout(() => {
          (card as HTMLElement).style.opacity = '1';
        }, 100 * index);
      });
    }, 0);
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPage(this.page() - 1);
    } else if (event.key === 'ArrowRight') {
      this.goToPage(this.page() + 1);
    } else if (event.key === 'Home') {
      this.goToPage(1);
    } else if (event.key === 'End') {
      this.goToPage(this.totalPages());
    }
  }
}
