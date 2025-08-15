import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText'
})
export class SliceTextPipe implements PipeTransform {

  transform(value: string, len: number): string {
    return this.slice(value, len);
  }

  private slice(text: string, maxlength: number): string {
    if (text.length > maxlength)
      text = text.slice(0, maxlength);

    return text;
  }

}
