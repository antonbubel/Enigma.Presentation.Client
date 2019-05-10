import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseApiService } from './base/base.api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApiService {
  private headers: any = { withCredentials: false };

  public constructor(private readonly http: HttpClient) {
    super();
  }

  public get(url: string): Observable<any> {
    const promise = this.http
      .get(url, this.headers)
      .toPromise();

    return this.handlePromise(promise);
  }

  public post(url: string, content: any): Observable<any> {
    const promise = this.http
      .post(url, content, this.headers)
      .toPromise();

    return this.handlePromise(promise);
  }

  public put(url: string, content: any): Observable<any> {
    const promise = this.http
      .put(url, content, this.headers)
      .toPromise();

    return this.handlePromise(promise);
  }
}
