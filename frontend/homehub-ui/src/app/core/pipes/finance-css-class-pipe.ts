import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financeCssClass'
})
export class FinanceCssClassPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return this.getTypeClass(value);
  }

  private getTypeClass(item: number): string {
    return item === 1 ? 'income' : 'expense';
  }

}
