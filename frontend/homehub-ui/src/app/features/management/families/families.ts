import { Component, effect, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { FamilyResponse } from '../../../models/families/family-response.model';
import { PaginationListResponse } from '../../../models';

@Component({
  selector: 'app-families',
  imports: [],
  templateUrl: './families.html',
  styleUrl: './families.scss'
})
export class Families {
  private readonly adminService: AdminService = inject(AdminService);

  readonly families = signal<FamilyResponse[]>([]);

  readonly loading = signal(true);
  readonly errorMessage = signal<string|null>(null);

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.errorMessage.set(null);
      this.adminService.getFamilies().subscribe({
        next: (paginationResponse: PaginationListResponse<FamilyResponse>) => {
          this.families.set(paginationResponse.items);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set("Възникна проблем при извличането на данните!");
        }
      });
    });
  } 
}
