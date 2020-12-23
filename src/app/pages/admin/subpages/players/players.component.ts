import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { PlayersService } from 'src/app/services/players.service'
import { ProfileService } from 'src/app/services/profile.service';
import { Player, User } from 'src/interface/interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],

})
export class PlayersComponent implements OnInit, DoCheck {

  users: User[] = []
  btnDisabled: boolean = false

  usersIndex: number = 0
  usersLength: number = 1

  paginatorChange(page: PageEvent) {
    this.usersIndex = page.pageIndex * page.pageSize
    this.usersLength = page.pageSize
  }

  register(user: User) {
    this.btnDisabled = true
    let regUser = Object.assign({}, user)
    let player: Player = {
      localId: regUser.localId,
      firstName: regUser.firstName,
      lastName: regUser.lastName,
    }
    this.playersService.registerPlayer(player).subscribe(
      () => {
        regUser.status = 'registered'
        this.profileService.patch(regUser).subscribe(
          (res) => {
            user.status = res.status
            this.btnDisabled = false
          },
          () => { this.btnDisabled = false },
          () => { this.btnDisabled = false }
        )
      },
      () => { this.btnDisabled = false },
    )
  }

  unregister(user: User) {
    let unUser = Object.assign({}, user)
    this.profileService.patch(unUser).subscribe(
      (res) => {
        user.status = res.status
      }
    )
  }

  constructor(private playersService: PlayersService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getRegisteredUser().subscribe(
      (users) => {
        if (users[0] !== undefined) {
          this.users = users
        }
      }
    )
  }
  ngDoCheck() {
    if (this.users) {
      this.users = this.users.filter(user => user.status !== 'unregistered')
    }
  }
}
