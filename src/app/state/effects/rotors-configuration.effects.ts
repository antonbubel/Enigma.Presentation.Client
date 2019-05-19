import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { RotorsConfigurationModel } from '@models/rotors-configuration.model';
import { environment } from 'src/environments/environment';

import * as types from '@state/actions/configuration/rotors-configuration/types';
import * as actions from '@state/actions/configuration/rotors-configuration';

@Injectable({
  providedIn: 'root'
})
export class RotorsConfigurationEffect {
  constructor(private actions$: Actions, private service: ApiService) { }

  @Effect()
  saveConfiguration: Observable<any> = this.actions$
    .pipe(
      ofType(types.ROTORS_CONFIGURATION_SAVE),
      map((action: any) => <RotorsConfigurationModel>action),
      mergeMap((configuration: RotorsConfigurationModel) => this.saveRotorsConfigurationRequest(configuration)
        .pipe(
          map(() => actions.setRotorLetters(
            configuration.firstLetter,
            configuration.secondLetter,
            configuration.thirdLetter)
          )
        )
      )
    )

  @Effect()
  loadRotorsConfiguration: Observable<any> = this.actions$
    .pipe(
      ofType(types.ROTORS_CONFIGURATION_LOAD),
      mergeMap(() => this.loadRotorsConfigurationRequest()
        .pipe(
          map(configuration => actions.setRotorLetters(
            configuration.firstLetter,
            configuration.secondLetter,
            configuration.thirdLetter)
          )
        )
      )
    )

  private loadRotorsConfigurationRequest(): Observable<RotorsConfigurationModel> {
    return this.service.get(
      `${environment.apiEndpoint}api/enigmaconfiguration/rotors-configuration`);
  }

  private saveRotorsConfigurationRequest(configuration: RotorsConfigurationModel): Observable<any> {
    return this.service.put(
      `${environment.apiEndpoint}api/enigmaconfiguration/rotors-configuration`, configuration);
  }
}
