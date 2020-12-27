import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/interface/interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input('playerOne') playerOne: Player
  @Input('playerTwo') playerTwo: Player
  @Output() winner = new EventEmitter<Player>()
  @Output() cancel = new EventEmitter<Player>()


  result(playerW: Player, playerL: Player) {
    let winner: Player = Object.assign({}, playerW)
    winner.round = winner.round / 2
    winner.position = Math.ceil(winner.position / 2)
    winner.canCancel = true
    this.winner.emit(winner)
    playerW.isPlayed = true
    playerL ? playerL.isPlayed = true : null
  }

  cancelWin(player: Player) {
    this.cancel.emit(player)
  }

  constructor() { }

  ngOnInit() {
  }
}
