import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BaseApiService } from './base/base.api.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApiService {

  private token: string;
  private authTokenSubscription: Subscription;

  private get headers(): HttpHeaders {
    const authToken = this.cookieService.get('auth-token') || this.token;

    if (authToken) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  } 

  public constructor(private readonly http: HttpClient, private readonly cookieService: CookieService,
    private readonly store: Store<AppState>) {
    super();
    this.createAuthTokenSubscription();
  }

  public get(url: string): Observable<any> {
    const promise = this.http
      .get(url, { headers: this.headers })
      .toPromise();

    return this.handlePromise(promise);
  }

  public post(url: string, content: any): Observable<any> {
    const promise = this.http
      .post(url, content, { headers: this.headers })
      .toPromise();

    return this.handlePromise(promise);
  }

  public put(url: string, content: any): Observable<any> {
    const promise = this.http
      .put(url, content, { headers: this.headers })
      .toPromise();

    return this.handlePromise(promise);
  }

  private createAuthTokenSubscription() {
    this.authTokenSubscription = this.store
      .select(state => state.authState)
      .pipe(filter(authState => <any>authState))
      .subscribe(authState => this.token = authState.token);
  }
}
