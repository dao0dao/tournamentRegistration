import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InfoService } from 'src/app/services/info.service';
import { ProfileService } from 'src/app/services/profile.service'
import { User } from 'src/interface/interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('modal', [
      transition('void => *', [style({ opacity: 0 }), animate('200ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0 }))])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  user: User = undefined
  isOpenModal: boolean = false
  disableSend: boolean = false

  sendRequest() {
    this.disableSend = true
    this.user.status = 'pending'
    this.profileService.patch(this.user).subscribe(
      (res) => {
        this.user.status = res.status
        this.disableSend = false
      }, () => { this.disableSend = false }, () => { this.disableSend = false }
    )
  }

  deleteUser() {
    this.profileService.deleteUser(this.user, this.autService.token).subscribe(
      () => {
        this.autService.logout()
        this.infoService.toggler(true, 'Konto zostało usunięte')
      }
    )
  }

  constructor(private profileService: ProfileService, private autService: AuthorizationService, public router: Router, private infoService: InfoService) { }

  ngOnInit() {
    this.profileService.getUserData(this.autService.token).subscribe(
      (res) => {
        this.profileService.getUser(res.users[0].localId).subscribe(
          (res) => {
            if (res) {
              this.user = res
            } else {
              this.router.navigate(['/profile/update'], { fragment: 'newUser' })
            }
          }
        )
      },
    )
  }
}
