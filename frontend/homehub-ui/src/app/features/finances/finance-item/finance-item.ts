import { Component, effect, Input, input, signal } from '@angular/core';
import { FinanceResponse } from '../../../models';
import { FinancesService } from '../../../core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-item',
  imports: [CommonModule],
  templateUrl: './finance-item.html',
  styleUrl: './finance-item.css'
})
export class FinanceItem {
  id = input<string>();

  // ✅ Signal to hold the finance data (if using manual subscription)
  finance = signal<FinanceResponse | null>(null);

  constructor(private financesService: FinancesService) {
    // ✅ Automatically fetch finance data when ID changes
    effect(() => {
      const currentId = this.id();
      if (currentId) {
        this.financesService.getFinance(currentId).subscribe(data => {
          this.finance.set(data);
        });
      }
    });
  }
}
