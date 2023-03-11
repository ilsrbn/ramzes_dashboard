import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AccessTokenDto, AdminAuthorizationService, BaseHttpRequest} from '../api';
import {catchError, switchMap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private baseHttp: BaseHttpRequest,
    private adminAuthService: AdminAuthorizationService,
    public jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public login(username: string, password: string) {
  //   this.http.post<AccessTokenDto>('http://localhost/3005/api/auth/login', {
  //     username,
  //     password
  //   }).pipe(catchError(err => {
  //     console.log(err);
  //     return of(err)
  //   })).subscribe((resp) => {
  //     console.log({ resp });
  //   })

    return this.adminAuthService.login( { requestBody: { username, password } }
    ).pipe(catchError(this.handleError)).subscribe((resp) => {
      console.log({ resp });
      const { access_token } = resp
      localStorage.setItem('authBearer', access_token)
      this.baseHttp.config.TOKEN = access_token
      this.router.navigateByUrl('app/photos')
    })
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authBearer');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
