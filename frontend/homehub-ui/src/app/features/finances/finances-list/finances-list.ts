import { Component } from '@angular/core';
import { FinancesListCollectionResponse } from '../../../models';
import { Observable } from 'rxjs';
import { FinancesService } from '../../../core/services';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finances-list',
  imports: [CommonModule, Pagination],
  templateUrl: './finances-list.html',
  styleUrl: './finances-list.css'
})
export class FinancesList  {
  finances$: Observable<FinancesListCollectionResponse>;
  
  constructor(private financesService: FinancesService) {
    this.finances$ = this.financesService.getFinances();
  }
}
