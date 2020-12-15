import { animate, style, transition, trigger } from '@angular/animations';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('title', [
      transition('void => *', [style({ opacity: 0 }), animate('200ms ease-in')]),
      transition('* => void', [animate('200ms ease-out', style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent implements DoCheck {

  showTitle: boolean = false

  constructor(public autService: AuthorizationService, private router: Router) { }
  ngDoCheck() {
    if (this.router.url !== '/') { this.showTitle = true } else { this.showTitle = false }
  }
}
