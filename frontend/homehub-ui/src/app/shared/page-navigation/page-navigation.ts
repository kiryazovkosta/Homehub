import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  imports: [CommonModule],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavigation {
  visiblePages: string[] = []

  totalCount = input<number>(0);
  totalPages = input<number>(0);
  page = input<number>(1);
  pageSize = input<number>(6);

  setPageNumber = output<number>();

  startIndex = computed(() => ((this.page() - 1) * this.pageSize()) + 1);
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize() - 1, this.totalCount()));

  constructor() {
    this.visiblePages = []

    effect(() => {
      for (let i = 1; i <= this.totalPages(); i++) {
        this.visiblePages.push(i.toString());
      }
    })
  }

  goToPage(pageNumber: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    
    setTimeout(() => {
      this.setPageNumber.emit(pageNumber);
    }, 0);
    
    return false;
  }
}
