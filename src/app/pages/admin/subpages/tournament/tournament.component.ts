import { Component, EventEmitter, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { TournamentService } from 'src/app/services/tournament.service'
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  contestants: Player[]
  round: number

  fillLadder() {
    let playersNumber: number = this.contestants.length
    if (playersNumber === 2) {
      this.round = 2
    } else if (playersNumber <= 4) {
      this.round = 4
    } else if (playersNumber <= 8) {
      this.round = 8
    } else {
      this.round = 16
    }
    this.contestants.map((user, index) => {
      user.position = index + 1;
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
    let contestant: Player = undefined
    this.contestants.map((user) => {
      if (user.round === round && user.position === position && user !== null) {
        contestant = user
      }
    })
    return contestant
  }

  winner(player: Player) {
    this.contestants.push(player)
  }

  cancelWin(player: Player) {
    let roundUpPlayer: Player
    roundUpPlayer = this.contestants.find(user => user.localId === player.localId && user.round <= player.round)
    if (roundUpPlayer === player) {
      const index = this.contestants.indexOf(player)
      this.contestants.map(user => {
        if ((player.position * 2 === user.position || player.position * 2 - 1 === user.position) && player.round * 2 === user.round) {
          user.isPlayed = false
        }
      })
      this.contestants.splice(index, 1)

    } else {
      this.infoService.toggler(true, 'Nie można usunąć')
    }
  }

  constructor(private tournamentService: TournamentService, private infoService: InfoService) { }

  ngOnInit() {
    this.tournamentService.getPlayers().subscribe(
      (players) => {
        this.contestants = players
        this.fillLadder()
      }
    )
  }

}
