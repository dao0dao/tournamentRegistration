import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortLast'
})
export class ShortLastPipe implements PipeTransform {

  transform(value: string): String {
    if (value.length > 15) {
      let shortLast = `${value.slice(0, 15)}.`
      return shortLast;
    } else {
      return value
    }
  }

}
