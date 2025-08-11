import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule} from '@angular/material/button';
import { PageEvent, MatPaginatorModule} from '@angular/material/paginator';

import { InventoriesQueryParameters, InventoriesService } from '../../../core/services/inventories.services';
import { AuthService } from '../../../core/services/auth.service';
import { InventoryListResponse, PaginationListResponse } from '../../../models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventories-list',
  imports: [
    CommonModule,
    RouterLink,
    MatGridListModule, 
    MatButtonModule, 
    MatPaginatorModule
  ],
  templateUrl: './inventories-list.html',
  styleUrl: './inventories-list.scss'
})
export class InventoriesList {
  private readonly inventoriesService: InventoriesService = inject(InventoriesService);
  private readonly authService: AuthService = inject(AuthService);

  colsItems = signal<number>(4);

  readonly page = signal<number>(1);
  readonly pageSize = signal(8);
  readonly items = signal<InventoryListResponse[]>([]);
  readonly totalCount = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly hasPreviousPage = signal<boolean>(false);
  readonly hasNextPage = signal<boolean>(false);

  readonly loading = signal(false);
  readonly errorMessage = signal<string|null>(null);

  queryParameters = signal<InventoriesQueryParameters>({
    page: 1,
    pageSize: 8,
    q: null,
    sort: null
  });

  readonly userid = this.authService.getUserId();

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.errorMessage.set(null);
  
      this.inventoriesService.getInventories(this.queryParameters()).subscribe({
        next: (response: PaginationListResponse<InventoryListResponse>) => {
          this.items.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
          this.hasPreviousPage.set(response.hasPreviousPage);
          this.hasNextPage.set(response.hasNextPage);
          this.errorMessage.set(null);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading inventories:', err);
          this.loading.set(false);
          this.errorMessage.set("Възникна проблем при извличането на данните!");
        }
      });
    });
  }

  onPageChange(event: PageEvent) {
    this.queryParameters.update(currentParams => ({
      ...currentParams,
      page: event.pageIndex + 1,
      pageSize: event.pageSize
    }));
  }
}
