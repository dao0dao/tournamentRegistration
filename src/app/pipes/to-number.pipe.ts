import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {

  transform(value: number | undefined): number {
    if (value == undefined) {
      return 0
    } else {
      return value
    }
  }

}
