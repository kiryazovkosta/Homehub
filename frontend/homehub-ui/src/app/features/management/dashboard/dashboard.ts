import { Component, inject, signal } from '@angular/core';
import { DashboardResponse } from '../../../models/admin/dashboard-response.model';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  dashboard = signal<DashboardResponse|null>(null);

  private readonly adminService: AdminService = inject(AdminService);

  constructor() {
    this.adminService.getDashboard().subscribe((dashboardResponse: DashboardResponse) => {
      this.dashboard.set(dashboardResponse);
    });
  }
} 