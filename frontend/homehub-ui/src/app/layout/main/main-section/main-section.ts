import { Component } from '@angular/core';
import { FinancesList } from "../../../features/finances/finances-list/finances-list";
import { FinanceItem } from '../../../features/finances/finance-item/finance-item';

@Component({
  selector: 'app-main-section',
  imports: [FinancesList, FinanceItem],
  templateUrl: './main-section.html',
  styleUrl: './main-section.css'
})
export class MainSection {

}
