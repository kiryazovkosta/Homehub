import { Component, effect, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { UserSimplyResponse } from '../../../models/users/simple-user-response.model';
import { PaginationListResponse } from '../../../models';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss'
})
export class AdminUsers {
  private readonly adminService: AdminService = inject(AdminService);

  readonly users = signal<UserSimplyResponse[]>([]);

  readonly loading = signal(true);
  readonly errorMessage = signal<string|null>(null);

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.errorMessage.set(null);

      this.adminService.getUsers().subscribe({
        next: (response: PaginationListResponse<UserSimplyResponse>) => {
          this.users.set(response.items);
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