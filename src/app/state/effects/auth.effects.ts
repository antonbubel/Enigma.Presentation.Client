import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CredentialsModel } from '@models/credentials.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

import * as types from '@state/actions/auth/types';
import * as actions from '@state/actions/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthEffect {
  constructor(private actions$: Actions, private store: Store<AppState>,
    private service: ApiService, private cookieService: CookieService) { }

  @Effect()
  authenticate: Observable<any> = this.actions$
    .pipe(
      ofType(types.AUTHENTICATE),
      map((action: any) => action.credentials),
      mergeMap((credentials: CredentialsModel) => this.doAuthRequest(credentials)
        .pipe(
          tap(({ auth_token, expires_in }) => this.cookieService.set('auth-token', auth_token, expires_in / 60 / 60 / 24)),
          map(({ id, auth_token, expires_in }) => actions.setToken(id, auth_token, expires_in))
        )
      )
    )

  private doAuthRequest(credentials: CredentialsModel): Observable<any> {
    return this.service.post(`${environment.apiEndpoint}api/auth`, credentials);
  }
}