import { Component, OnInit, DoCheck } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { PlayersService } from 'src/app/services/players.service';
import { ProfileService } from 'src/app/services/profile.service';

import { TournamentService } from 'src/app/services/tournament.service'
import { Player, User } from 'src/interface/interface';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit, DoCheck {

  contestants: Player[]
  registerPlayers: Player[]
  registerUsers: User[]
  round: number
  activeTournament: boolean = false
  noPlayers: boolean = false

  setRounds(playersNumber: number) {
    if (playersNumber === 2) {
      this.round = 2
    } else if (playersNumber <= 4) {
      this.round = 4
    } else if (playersNumber <= 8) {
      this.round = 8
    } else {
      this.round = 16
    }
  }

  fillLadder() {
    let playersNumber: number = this.contestants.length
    this.setRounds(playersNumber)
    let selPositions: number[] = []
    let position: number
    this.contestants.map(user => {
      do {
        position = Math.ceil(Math.random() * this.round)
      } while (selPositions.includes(position));
      selPositions.push(position)
      user.position = position;
      user.canCancel = false
      if (playersNumber === 2) {
        user.round = 2
      } else if (playersNumber <= 4) {
        user.round = 4
      } else if (playersNumber <= 8) {
        user.round = 8
      } else {
        user.round = 16
      }
    })
  }


  getContestant(round: number, position: number): Player {
    let contestant: Player
    this.contestants.map((user) => {
      if (user.round === round && user.position === position && user !== null) {
        contestant = user
      }
    })
    return contestant
  }

  getTournamentWinner(): Player {
    if (this.getContestant(1, 1) == null) {
      return null
    } else {
      return this.getContestant(1, 1)
    }
  }

  winner(winner: Player) {
    this.contestants.push(winner)
    this.tournamentService.updateLadder(this.contestants).subscribe()
    let player: Player = this.registerPlayers.find(el => el.localId === winner.localId)
    player.points += 1
    this.playerService.updatePlayer(player).subscribe()
  }

  cancelWin(player: Player) {
    let roundUpPlayer: Player
    roundUpPlayer = this.contestants.find(user => user.localId === player.localId && user.round < player.round)
    if (roundUpPlayer) {
      this.infoService.toggler(true, 'Nie można usunąć')
    } else {
      let minPointsPlayer = this.registerPlayers.find(user => user.localId === player.localId)
      minPointsPlayer.points -= 1
      const index = this.contestants.indexOf(player)
      this.contestants.map(user => {
        if ((player.position * 2 === user.position || player.position * 2 - 1 === user.position) && player.round * 2 === user.round) {
          user.isPlayed = false
        }
      })
      this.contestants.splice(index, 1)
      this.tournamentService.updateLadder(this.contestants).subscribe()
      this.playerService.updatePlayer(minPointsPlayer).subscribe()
    }
  }

  fillPlayers() {
    this.tournamentService.getPlayers().subscribe(
      (players) => {
        this.contestants = players
        this.fillLadder()
      }
    )
  }
  startTournament() {
    this.tournamentService.startTournament(this.contestants).subscribe(
      () => {
        this.activeTournament = true
      }
    )
  }

  stopTournament() {
    this.tournamentService.stopTournament(this.registerPlayers).subscribe(
      () => {
        this.activeTournament = false
        this.contestants = undefined
        this.registerPlayers = undefined
        this.noPlayers = true
        this.registerUsers.filter((user) => { user.status = 'pending' })
        this.registerUsers.forEach((user) => { this.profileService.patch(user).subscribe() })
      }
    )

  }

  constructor(private tournamentService: TournamentService, private infoService: InfoService, private playerService: PlayersService, private profileService: ProfileService) { }
  ngOnInit() {

    this.profileService.getRegisteredUser().subscribe(
      (users) => {
        this.registerUsers = users.filter(user => user.status === 'registered')
      }
    )
    this.playerService.getContestants().subscribe(
      res => {
        this.registerPlayers = res
        this.setRounds(res.length)

        this.tournamentService.isTournament().subscribe(
          (res) => {
            if (res && this.registerUsers.length > 0) {
              if (res && res.active === true) {
                this.activeTournament = res.active
                this.contestants = res.contestants
              } else if (res && res.active === false) {
                this.fillPlayers()
              } else {
                this.activeTournament = false
                this.fillPlayers()
              }
            } else {
              this.noPlayers = true
            }
          }
        )
      }
    )
  }

  ngDoCheck() {
  }

}