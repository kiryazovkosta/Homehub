import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financeType'
})
export class FinanceTypePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return this.getTypeValue(value);
  }

  getTypeValue(item: number): string {
    return item === 1 ? 'Приход' : 'Разход';
  }

}
