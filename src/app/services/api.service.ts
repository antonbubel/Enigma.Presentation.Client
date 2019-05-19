import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseApiService } from './base/base.api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApiService {
  private get headers(): HttpHeaders {
    const authToken = this.cookieService.get('auth-token');

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

  public constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {
    super();
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
}
