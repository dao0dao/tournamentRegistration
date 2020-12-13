import { FormControl } from '@angular/forms'

export class MyValidators {

    static startsWithSpace(control: FormControl): { [key: string]: boolean } | false {
        if (!control || !control.value) {
            return false
        } else if (control.value.startsWith(' ')) {
            return { startsWithSpace: true }
        } else {
            return false
        }
    }
    static required(control: FormControl): { [key: string]: boolean } | false {
        if (!control || !control.value) {
            return false
        } else if (control.value.length === 0 && control.dirty) {
            return { required: true }
        } else {
            return false
        }
    }
    static phoneNumber(control: FormControl): { [key: string]: boolean } | false {
        if (!control || !control.value) {
            return false
        } else if (control.value.toString().length !== 9 && control.dirty) {
            return { required: true }
        } else {
            return false
        }
    }

}