
import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  imports: [],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavigation {
  visiblePages = signal<string[]>([]);

  totalCount = input<number>(0);
  totalPages = input<number>(0);
  page = input<number>(1);
  pageSize = input<number>(6);

  setPageNumber = output<number>();

  startIndex = computed(() => ((this.page() - 1) * this.pageSize()) + 1);
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize() - 1, this.totalCount()));

  constructor() {
    effect(() => {
      const pages: string[] = [];
      for (let i = 1; i <= this.totalPages(); i++) {
        pages.push(i.toString());
      }
      this.visiblePages.set(pages);
    });
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
