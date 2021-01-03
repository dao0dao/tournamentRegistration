import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InfoService } from 'src/app/services/info.service';
import { ScoreService } from 'src/app/services/score.service'
import { TournamentResult } from 'src/interface/interface';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  animations: [
    trigger('content', [
      state('false', style({ 'max-height': 0 })),
      state('true', style({ 'max-height': '500px' })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ]),
    trigger('modal', [
      transition('void => *', [style({ opacity: 0 }), animate('200ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0 }))])
    ])
  ]
})
export class ScoreboardComponent implements OnInit {

  results: TournamentResult[]
  modalOpen: boolean = false

  clearResults() {
    if (this.autService.uid) {
      this.scoreService.clearResult().subscribe(
        () => {
          this.modalOpen = false
          this.results = undefined
        },
        () => {
          this.modalOpen = false
        },
        () => {
          this.modalOpen = false
        },
      )
    } else {
      this.modalOpen = false
      this.infoService.toggler(true, 'Brak uprawnień')
    }
  }

  constructor(private scoreService: ScoreService, public autService: AuthorizationService, private infoService : InfoService) { }

  ngOnInit() {
    this.scoreService.getResults().subscribe(
      (res) => {
        if (res) {
          this.results = res
          this.results.map((tour, i) => { tour.index = i })
          this.results.reverse()
          this.results.map(tour => {
            tour.expand = false
            tour.contestants.sort((p1, p2) => (p2.points - p1.points))
          })
        }
      }
    )
  }

}
