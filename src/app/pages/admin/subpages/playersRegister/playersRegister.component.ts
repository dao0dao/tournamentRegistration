import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';


import { PlayersService } from 'src/app/services/players.service'
import { ProfileService } from 'src/app/services/profile.service';
import { Player, User } from 'src/interface/interface';

@Component({
  selector: 'app-players',
  templateUrl: './playersRegister.component.html',
  styleUrls: ['./playersRegister.component.scss'],

})
export class PlayersRegisterComponent implements OnInit, DoCheck {

  originUsers: User[]
  users: User[]
  btnDisabled: boolean[] = []
  activeTournament: boolean = false

  usersIndex: number = 0
  usersLength: number = 10
  sortUser: string = '0'

  paginatorChange(page: PageEvent) {
    this.usersIndex = page.pageIndex * page.pageSize
    this.usersLength = page.pageSize
  }

  register(user: User, index: number) {
    this.btnDisabled[index] = true
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
            this.btnDisabled[index] = false
          },
          () => { this.btnDisabled[index] = false },
          () => { this.btnDisabled[index] = false }
        )
      },
      () => { this.btnDisabled[index] = false },
    )
  }

  unregister(user: User, index: number) {
    let unUser = Object.assign({}, user)
    unUser.status = "unregistered"
    this.profileService.patch(unUser).pipe(
      map(
        (res) => {
          user.status = res.status
          this.playersService.unregister(res).subscribe()
        }
      )
    ).subscribe(
      () => {
        const index = this.users.indexOf(user)
        if (index > -1) {
          this.users.splice(index, 1)
          this.originUsers = this.users
        }
      }
    )
  }

  constructor(private playersService: PlayersService, private profileService: ProfileService) { }

  ngOnInit() {
    this.playersService.isTournament().subscribe(
      (res: Array<{ [key: string]: boolean }>) => {
        this.activeTournament = res.reduce(el => { return el }).active
      }
    )

    this.profileService.getRegisteredUser().subscribe(
      (users) => {
        if (users[0] !== undefined || users.length > 1) {
          this.originUsers = users
          this.originUsers.map(el => this.btnDisabled.push(false))
        }
      }
    )
  }
  ngDoCheck() {
    if (this.originUsers) {
      this.users = this.originUsers.filter(user => {
        if (this.sortUser === '0' && user.status !== 'unregistered') {
          return user
        } else if (this.sortUser === '1') {
          return user.status === 'pending'
        } else if (this.sortUser === '2') {
          return user.status === 'registered'
        }
      });
    }
  }
}
