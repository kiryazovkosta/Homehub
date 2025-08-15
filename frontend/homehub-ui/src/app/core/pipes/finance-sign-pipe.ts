import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financeSign'
})
export class FinanceSignPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return this.getTypeSign(Number(value));
  }

  private getTypeSign(item: number): string {
    return item === 1 ? '+' : '-';
  }

}
