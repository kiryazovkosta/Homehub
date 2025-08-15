import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financeStatusClass'
})
export class FinanceStatusClassPipe implements PipeTransform {

    transform(
      date: string | Date | undefined | null, 
      isBeforeOrAfterToday: (date: string | Date | undefined | null) => number): string {
        const status = isBeforeOrAfterToday(date);
        if (status === -1) return 'past-status';
        if (status === 0) return 'current-status';
        return 'active-status';
  }

}
