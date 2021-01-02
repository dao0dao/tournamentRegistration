import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.scss']
})
export class LadderComponent implements OnInit {

  round = 0
  contestants: Player[]
  noPlayers: boolean = false

  getContestant(round: number, position: number): Player {
    let contestant: Player
    this.contestants.map((user) => {
      if (user.round === round && user.position === position && user !== null) {
        contestant = user
      }
    })
    return contestant
  }
  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.tournamentService.isTournament().subscribe(
      (res) => {
        if (res.contestants) {
          res.contestants.map(player => {
            if (player.position >= this.round) {
              this.round = player.position
            }
          })
          this.contestants = res.contestants
        } else {
          this.noPlayers = true
        }
      }
    )
  }

}
