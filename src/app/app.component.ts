import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(public autService: AuthorizationService) { }
}
