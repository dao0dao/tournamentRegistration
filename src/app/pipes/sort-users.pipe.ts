import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/interface/interface';

@Pipe({
  name: 'sortUsers',
})
export class SortUsersPipe implements PipeTransform {

  transform(value: User[], index: number, length: number): User[] {
    if (value.length >= 1) {
      let users: User[] = []
      for (let i = index; i < index + length; i++) {
        if (i < value.length) {
          users.push(value[i])
        }
      }
      return users
    } else {
      return value
    }
  }

}
