import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from './authorization.service';
import { catchError } from 'rxjs/operators';
import { InfoService } from './info.service';

@Injectable()
export class AuthInterceptService implements HttpInterceptor {

  private handleError() {
    this.authService.logout()
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.fbUrlDatabase)) {
      const cloneReq = req.clone({
        setParams: {
          auth: this.authService.token
        }
      })
      return next.handle(cloneReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.infoService.toggler(true, 'Sesja wygasła')
            this.handleError()
          }
          return throwError(err)
        })
      )
    } else {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.infoService.toggler(true, 'Sesja wygasła')
            this.handleError()
          }
          return throwError(err)
        })
      )
    }
  }

  constructor(private authService: AuthorizationService, private infoService: InfoService) { }
}
