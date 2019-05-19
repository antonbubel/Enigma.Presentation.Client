import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ConfigurationModel } from '@models/configuration.model';
import { environment } from 'src/environments/environment';

import * as types from '@state/actions/configuration/types';
import * as actions from '@state/actions/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationEffect {
  constructor(private actions$: Actions, private service: ApiService) { }

  @Effect()
  saveConfiguration: Observable<any> = this.actions$
    .pipe(
      ofType(types.CONFIGURATION_SAVE),
      map((action: any) => <ConfigurationModel>action),
      mergeMap((configuration: ConfigurationModel) => this.saveConfigurationRequest(configuration)
        .pipe(
          map(() => actions.setConfiguration(
            configuration.firstRotor,
            configuration.secondRotor,
            configuration.thirdRotor,
            configuration.reflector,
            configuration.plugboardMap)
          )
        )
      )
    )

  @Effect()
  loadConfiguration: Observable<any> = this.actions$
    .pipe(
      ofType(types.CONFIGURATION_LOAD),
      mergeMap(() => this.loadConfigurationRequest()
        .pipe(
          map(configuration => actions.setConfiguration(
            configuration.firstRotor,
            configuration.secondRotor,
            configuration.thirdRotor,
            configuration.reflector,
            configuration.plugboardMap)
          )
        )
      )
    )

  private loadConfigurationRequest(): Observable<ConfigurationModel> {
    return this.service.get(
      `${environment.apiEndpoint}api/enigmaconfiguration/configuration`
    );
  }

  private saveConfigurationRequest(configuration: ConfigurationModel): Observable<any> {
    return this.service.put(
      `${environment.apiEndpoint}api/enigmaconfiguration/configuration`, configuration);
  }
}