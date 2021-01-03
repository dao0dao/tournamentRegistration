import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortFullName'
})
export class ShortFullNamePipe implements PipeTransform {

  transform(value: string | undefined): string | undefined {
    if (value === undefined) {
      return value
    } else {
      let index: number = value.indexOf(' ') + 1
      let shortFullName = `${value.slice(0, 1)}. ${value.slice(index, index+15)}.`
      return shortFullName;
    }
  }

}
