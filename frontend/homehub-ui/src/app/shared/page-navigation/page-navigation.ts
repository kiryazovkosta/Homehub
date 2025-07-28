import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  imports: [CommonModule],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavigation {
  startIndex: number = 0;
  endIndex: number = 6;
  visiblePages: string[] = []

  totalCount = input<number>(0);
  totalPages = input<number>(0);
  page = input<number>(1);
  pageSize = input<number>(6);

  setPageNumber = output<number>();

  constructor() {
    this.visiblePages = []

    effect(() => {
        this.startIndex = ((this.page() - 1) * this.pageSize()) + 1;
        this.endIndex = Math.min(this.startIndex + this.pageSize() - 1, this.totalCount());

      for (let i = 1; i <= this.totalPages(); i++) {
        this.visiblePages.push(i.toString());
      }
    })
  }

  goToPage(pageNumber: number) {
    console.log(pageNumber);
    this.setPageNumber.emit(pageNumber);
  }
}
