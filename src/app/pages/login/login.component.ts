import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/validators/myValidators';
import { FbErrors, FbLogIn, FbResetPassword, FbResLogin, FbResUserData } from 'src/interface/interface';
import { ApiLoginService } from 'src/app/services/apiLogin.service'
import { InfoService } from 'src/app/services/info.service';
import { animate, style, transition, trigger } from '@angular/animations';

interface Hint {
  isOpen: boolean,
  type: 'pass' | 'verify' | null
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('hint', [
      transition('* => void', animate('100ms ease-out', style({ opacity: 0 }))),
      transition('void => *', animate('100ms ease-out', style({ opacity: 1 })))
    ])
  ]
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup
  btnDisable: boolean = false
  hint: Hint = {
    isOpen: false,
    type: null
  }
  hintForm: FormGroup
  hintBtnDisable: boolean = false
  idToken = {
    idToken: ''
  }
  get email() {
    return this.logInForm.get('email')
  }

  get password() {
    return this.logInForm.get('password')
  }
  get hintEmail() {
    return this.hintForm.get('hintEmail')
  }

  handleError(messageError: string) {
    let message: string
    switch (messageError) {
      case 'INVALID_ID_TOKEN':
        message = 'Błędne id, spróbuj jeszcze raz.'
        this.hint.type = null
        break;
      case 'USER_NOT_FOUND':
        message = 'Użytkownik nie istnieje w bazie danych.'
        this.hint.type = null
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Błędne hasło lub email.'
        this.hint.type = 'pass'
        break;
      case 'INVALID_PASSWORD':
        message = 'Błędne hasło lub email.'
        this.hint.isOpen = false
        this.hint.type = 'pass'
        break;
      case 'USER_DISABLED':
        message = 'Użytkownik jest odłączony.'
        this.hint.type = null
        break;
      default:
        message = "Ups... coś poszło nie tak, spróbuj ponownie później."
        this.hint.type = null
        break;
    }
    this.infoService.toggler(true, message)
  }

  checkVerification(idToken: string) {
    this.idToken = {
      idToken
    }
    this.apiLoginService.sendEmailVerified(this.idToken).subscribe(
      (res: FbResUserData) => {
        if (res.users[0].emailVerified === false) {
          this.infoService.toggler(true, 'Proszę potwierdzić adres email.')
          this.hint.type = 'verify'
        } else if (res.users[0].emailVerified === true) {
 
        } else {
          this.handleError(null)
        }
        this.btnDisable = false
        this.logInForm.reset()
      },
      (res: FbErrors) => {
        const { message } = res.error.error
        this.handleError(message)
        this.btnDisable = false
      }
    )
  }

  submit() {
    this.btnDisable = true
    let login: FbLogIn = {
      email: this.email.value.trim(),
      password: this.password.value,
      returnSecureToken: true
    }
    this.apiLoginService.login(login).subscribe(
      (res: FbResLogin) => {
        this.checkVerification(res.idToken)
      },
      (res: FbErrors) => {
        this.logInForm.reset()
        const { message } = res.error.error
        this.handleError(message)
        this.btnDisable = false
      }
    )
  }

  hintSubmit() {
    this.hintBtnDisable = true
    if (this.hint.type === 'pass') {
      let body: FbResetPassword = {
        requestType: 'PASSWORD_RESET',
        email: this.hintEmail.value.trim()
      }
      this.apiLoginService.resetPassword(body).subscribe(
        () => {
          this.hint.isOpen = false
          this.hintBtnDisable = false
          this.infoService.toggler(true, `Wysłano link resetujący hasło na adres: ${body.email}`)
          this.hintForm.reset()
        },
        (res: FbErrors) => {
          const { message } = res.error.error
          this.hint.isOpen = false
          this.hintBtnDisable = false
          this.handleError(message)
          this.hintForm.reset()
        }
      )
    } else if (this.hint.type === 'verify') {
      this.apiLoginService.sendEmailVerified(this.idToken).subscribe(
        () => {
          this.hint.isOpen = false
          this.hintBtnDisable = false
          this.infoService.toggler(true, `Wysłano link weryfikujący na podany adres.`)
          this.hintForm.reset()
        },
        (res: FbErrors) => {
          const { message } = res.error.error
          this.hint.isOpen = false
          this.hintBtnDisable = false
          this.handleError(message)
          this.hintForm.reset()
        }
      )
    }
  }

  constructor(private fb: FormBuilder, private apiLoginService: ApiLoginService, private infoService: InfoService) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.email, MyValidators.required]],
      password: ['', [MyValidators.required]]
    })

    this.hintForm = this.fb.group({
      hintEmail: ['', [Validators.email, MyValidators.required]]
    })
  }

}
