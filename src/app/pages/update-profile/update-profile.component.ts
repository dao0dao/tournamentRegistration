import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MyValidators } from 'src/app/validators/myValidators';
import { User } from 'src/interface/interface';

type Title = 'Proszę uzupełnić dane' | 'Edycja danych'
type Method = 'post' | 'patch'


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  title: Title
  userForm: FormGroup
  method: Method
  btnDisable: boolean = false
  user: User
  spinner: boolean = true

  get firstName() {
    return this.userForm.get('firstName')
  }
  get lastName() {
    return this.userForm.get('lastName')
  }
  get email() {
    return this.userForm.get('email')
  }
  get phone() {
    return this.userForm.get('phone')
  }
  get status() {
    return this.userForm.get('status')
  }

  async submit() {
    this.btnDisable = true
    if (this.method === 'post') {
      let user: User = {
        id: '',
        localId: '',
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        email: this.email.value,
        phone: this.phone.value,
        status: this.status.value
      }
      this.profileService.getUserData(this.authService.token).subscribe(
        (res) => {
          user.localId = res.users[0].localId
          this.profileService.postUser(user).subscribe()
        }, () => { },
        () => {
          this.userForm.reset()
          localStorage.removeItem('firstName')
          localStorage.removeItem('lastItem')
          this.router.navigate(['/profile'])
        }
      )

    } else if (this.method === 'patch') {
      let user: User = {
        id: this.user.id,
        localId: this.user.localId,
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        email: this.email.value,
        phone: this.phone.value,
        status: this.status.value
      }
      this.profileService.patch(user).subscribe(
        () => { }, () => { }, () => {
          this.userForm.reset()
          this.btnDisable = false
          this.router.navigate(['/profile'])
        }
      )
    }
  }

  constructor(private route: ActivatedRoute, public router: Router, private fb: FormBuilder, private profileService: ProfileService, private authService: AuthorizationService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [MyValidators.startsWithSpace, MyValidators.required, Validators.maxLength(15), MyValidators.notWord]],
      lastName: ['', [MyValidators.required, MyValidators.startsWithSpace, Validators.maxLength(30), MyValidators.notWord]],
      email: [''],
      phone: ['', [MyValidators.phoneNumber]],
      status: [''],
    })

    this.profileService.getUserData(this.authService.token).subscribe(
      (res) => {
        this.profileService.getUser(res.users[0].localId).subscribe(
          (user) => {
            this.user = user
            this.spinner = false
            if ((this.route.snapshot.fragment === 'newUser' && user == null) || (!this.route.snapshot.fragment && user == null)) {
              this.title = 'Proszę uzupełnić dane';
              this.method = 'post'
              this.firstName.setValue(localStorage.getItem('firstName'))
              this.lastName.setValue(localStorage.getItem('lastName'))
              this.email.setValue(res.users[0].email)
              this.status.setValue('unregistered')
              this.userForm.updateValueAndValidity()
              localStorage.removeItem('firstName')
              localStorage.removeItem('lastName')
            } else if ((!this.route.snapshot.fragment && user != null) || (this.route.snapshot.fragment === 'newUser' && user != null)) {
              this.title = 'Edycja danych'
              this.method = 'patch'
              this.firstName.setValue(user.firstName)
              this.lastName.setValue(user.lastName)
              this.email.setValue(user.email)
              this.phone.setValue(user.phone)
              this.status.setValue(user.status)
              this.userForm.updateValueAndValidity()
            } else if (this.route.snapshot.fragment !== 'newUser' && this.route.snapshot.fragment) {
              this.router.navigate(['/error'])
            }
          }
        )
      }
    )
  }
}
