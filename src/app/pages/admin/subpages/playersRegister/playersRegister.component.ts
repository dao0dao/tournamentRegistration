import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';


import { PlayersService } from 'src/app/services/players.service'
import { ProfileService } from 'src/app/services/profile.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Player, User } from 'src/interface/interface';

@Component({
  selector: 'app-players',
  templateUrl: './playersRegister.component.html',
  styleUrls: ['./playersRegister.component.scss'],
  animations: [
    trigger('maxUsers', [
      transition('void => *', [style({ opacity: 0 }), animate('200ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0 }))])
    ])
  ]

})
export class PlayersRegisterComponent implements OnInit, DoCheck {

  originUsers: User[]
  users: User[]
  btnDisabled: boolean[] = []
  activeTournament: boolean = false
  noUsers: boolean = false

  usersIndex: number = 0
  usersLength: number = 10
  sortUser: string = '0'

  maxPlayers: boolean = false

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
      points: 0
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

  unregister(user: User) {
    user.status = "unregistered"
    this.profileService.patch(user).pipe(
      map(
        (res) => {
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

  constructor(private playersService: PlayersService, private profileService: ProfileService, private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.isTournament().subscribe(
      (res) => {
        if (res) {
          this.activeTournament = res.active
        } else {
          this.activeTournament = false
        }
      }
    )
      
    this.profileService.getRegisteredUser().subscribe(
      (users) => {
        if (users[0] !== undefined || users.length > 1) {
          this.originUsers = users
          this.originUsers.map(() => this.btnDisabled.push(false))
        } else {
          this.noUsers = true
        }
      }
    )
  }
  ngDoCheck() {
    if (this.originUsers) {
      this.users = [...this.originUsers]
      if (this.users.filter(el => el.status !== 'unregistered').length === 0) {
        this.noUsers = true
      } else {
        this.noUsers = false
      }
      if (this.sortUser === '0') {
        this.users = this.users.filter(user => user.status !== 'unregistered')
      } else if (this.sortUser === '1') {
        this.users = this.users.filter(user => user.status === 'pending')
      } else if (this.sortUser === '2') {
        this.users = this.users.filter(user => user.status === 'registered')
      }
    }
  }
}
