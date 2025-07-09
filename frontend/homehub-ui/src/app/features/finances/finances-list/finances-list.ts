import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

interface FinanceRecord {
  id: number;
  title: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
}

@Component({
  selector: 'app-finances-list',
  imports: [CommonModule],
  templateUrl: './finances-list.html',
  styleUrl: './finances-list.scss'
})
export class FinancesList implements OnInit  {
financeRecords: FinanceRecord[] = [
    { id: 1, title: 'Продажба продукт А', type: 'income', description: 'Продажба на основен продукт за клиент от София', amount: 2500 },
    { id: 2, title: 'Офис разходи', type: 'expense', description: 'Месечни разходи за офис материали и услуги', amount: 850 },
    { id: 3, title: 'Дигитална реклама', type: 'expense', description: 'Google Ads кампания за Q1 2024', amount: 1200 },
    { id: 4, title: 'Консултантски услуги', type: 'income', description: 'Консултантски проект за стартъп компания', amount: 3800 },
    { id: 5, title: 'Лиценз софтуер', type: 'expense', description: 'Годишен лиценз за Adobe Creative Suite', amount: 650 },
    { id: 6, title: 'Веб дизайн проект', type: 'income', description: 'Пълноценен уеб сайт за ресторант', amount: 4200 },
    { id: 7, title: 'Транспортни разходи', type: 'expense', description: 'Месечни разходи за транспорт', amount: 320 },
    { id: 8, title: 'Мобилно приложение', type: 'income', description: 'Разработка на iOS приложение', amount: 6500 },
    { id: 9, title: 'Хостинг услуги', type: 'expense', description: 'Годишен план за уеб хостинг', amount: 480 },
    { id: 10, title: 'SEO оптимизация', type: 'income', description: 'SEO услуги за корпоративен клиент', amount: 2100 },
    { id: 11, title: 'Офис наем', type: 'expense', description: 'Месечен наем за офис пространство', amount: 1500 },
    { id: 12, title: 'Лого дизайн', type: 'income', description: 'Създаване на фирмена идентичност', amount: 1800 },
    { id: 13, title: 'Застраховки', type: 'expense', description: 'Годишни бизнес застраховки', amount: 950 },
    { id: 14, title: 'Онлайн курс', type: 'income', description: 'Продажби на онлайн курс за дизайн', amount: 3200 },
    { id: 15, title: 'Счетоводни услуги', type: 'expense', description: 'Месечни счетоводни услуги', amount: 550 },
    { id: 16, title: 'E-commerce сайт', type: 'income', description: 'Онлайн магазин за дрехи', amount: 5800 },
    { id: 17, title: 'Интернет и телефони', type: 'expense', description: 'Месечни разходи за комуникации', amount: 280 },
    { id: 18, title: 'Поддръжка на сайтове', type: 'income', description: 'Месечна поддръжка на 5 сайта', amount: 2400 }
  ];

  paginatedRecords: FinanceRecord[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;
  startItem = 0;
  endItem = 0;
  visiblePages: (number | string)[] = [];

  constructor() { }

  ngOnInit(): void {
    this.totalItems = this.financeRecords.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination(): void {
    // Calculate paginated records
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.paginatedRecords = this.financeRecords.slice(startIndex, endIndex);

    // Update info
    this.startItem = startIndex + 1;
    this.endItem = endIndex;

    // Calculate visible page numbers
    this.calculateVisiblePages();

    // Add animation
    this.animateCards();
  }

  calculateVisiblePages(): void {
    const pages: (number | string)[] = [];

    if (this.totalPages <= 5) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (this.currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(this.totalPages - 1, this.currentPage + 1); i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(this.totalPages);
    }

    this.visiblePages = pages;
  }

  goToPage(page: number | string): void {
    // Проверяваме дали page е число
    if (typeof page !== 'number') {
      return;
    }

    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    this.updatePagination();

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
      this.goToPage(this.currentPage - 1);
    } else if (event.key === 'ArrowRight') {
      this.goToPage(this.currentPage + 1);
    } else if (event.key === 'Home') {
      this.goToPage(1);
    } else if (event.key === 'End') {
      this.goToPage(this.totalPages);
    }
  }
}
