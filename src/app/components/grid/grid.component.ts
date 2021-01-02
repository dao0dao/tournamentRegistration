import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, DoCheck {

  @Input('playerOne') playerOne: Player
  @Input('playerTwo') playerTwo: Player
  @Output() winner = new EventEmitter<Player>()
  @Output() cancel = new EventEmitter<Player>()
  @Input('canEdit') canEdit: boolean = false

  activeTournament: boolean = false

  result(playerWin: Player, playerOne?: Player, playerTwo?: Player) {
    let winner: Player = Object.assign({}, playerWin)
    winner.round = winner.round / 2
    winner.position = Math.ceil(winner.position / 2)
    winner.canCancel = true
    playerOne ? playerOne.isPlayed = true : null
    playerTwo ? playerTwo.isPlayed = true : null
    this.winner.emit(winner)
  }

  cancelWin(player: Player) {
    this.cancel.emit(player)
  }

  constructor(private tournamentService: TournamentService, public autService: AuthorizationService) { }

  ngOnInit() {

  }
  ngDoCheck() {
    if (this.playerOne && this.playerTwo && this.playerOne.isPlayed) { this.playerTwo.isPlayed = true }
    if (this.playerTwo && this.playerOne && this.playerTwo.isPlayed) { this.playerOne.isPlayed = true }
    if (this.tournamentService.tournamentStatus !== undefined) {
      this.activeTournament = this.tournamentService.tournamentStatus.active
    }
  }
}
