import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from 'src/app/validators/myValidators'
import { FbErrors, FbRegister, SignUp } from 'src/interface/interface';
import { ApiRegisterService } from 'src/app/services/apiRegister.service'
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  btnDisabled: boolean = false

  errorhandler(message: string): string {
    let infoMessage: string
    switch (message) {
      case 'INVALID_ID_TOKEN':
        infoMessage = 'Nieprawidłowy użytkownik.'
        break;
      case 'USER_NOT_FOUND':
        infoMessage = 'Użytkownik nie istniej.'
        break;
      case 'EMAIL_EXISTS':
        infoMessage = 'Taki adres email już istnieje'
        break;
      case 'OPERATION_NOT_ALLOWED':
        infoMessage = 'Nie podano hasła.'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        infoMessage = 'Zbyt dużo połączeń, spróbuj za chwile.'
        break;
      default:
        infoMessage = 'Ups... coś poszło nie tak, spróbuj jeszcze raz.'
        break;
    }
    return infoMessage
  }

  submit() {
    this.btnDisabled = true
    let newUser: FbRegister = {
      email: this.email.value.trim(),
      password: this.password.value,
      returnSecureToken: true
    }
    this.apiRegisterService.register(newUser).subscribe(
      (res: SignUp) => {
        this.apiRegisterService.sendEmailVerify(res).subscribe(
          () => {
            localStorage.setItem('firstName', this.firstName.value.trim())
            localStorage.setItem('lastName', this.lastName.value.trim())
            this.infoService.toggler(true, 'Wysłano link aktywacyjny na podany adres email')
            this.btnDisabled = false
            this.registerForm.reset()
            this.router.navigate(['/login'])
          },
          (err: FbErrors) => {
            const { message } = err.error.error
            this.infoService.toggler(true, this.errorhandler(message))
            this.btnDisabled = false
            this.registerForm.reset()
          }
        )
      },
      (err: FbErrors) => {
        const { message } = err.error.error
        this.infoService.toggler(true, this.errorhandler(message))
        this.btnDisabled = false
        this.registerForm.reset()
      }
    )
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  constructor(private fb: FormBuilder, private apiRegisterService: ApiRegisterService, private router: Router, private infoService: InfoService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [MyValidators.startsWithSpace, MyValidators.required, MyValidators.notWord]],
      lastName: ['', [MyValidators.startsWithSpace, MyValidators.required, MyValidators.notWord]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6), MyValidators.startsWithSpace]]
    })
  }

}
