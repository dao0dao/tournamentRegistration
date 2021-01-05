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
    static notWord(control: FormControl): { [key: string]: boolean } | false {
        const regExp = /[^A-za-z-]+/g
        if (!control || !control.value) {
            return false
        } else if (regExp.test(control.value.toString())) {
            return { notWord: true }
        } else {
            return false
        }
    }

}