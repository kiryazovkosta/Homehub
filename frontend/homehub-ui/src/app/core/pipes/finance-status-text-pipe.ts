import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financeStatusText'
})
export class FinanceStatusTextPipe implements PipeTransform {

    transform(
      date: string | Date | undefined | null, 
      isBeforeOrAfterToday: (date: string | Date | undefined | null) => number): string {
        const status = isBeforeOrAfterToday(date);
        if (status === -1) return 'Изминала';
        if (status === 0) return 'Текуща';
        return 'Активна';

    
  }

}
