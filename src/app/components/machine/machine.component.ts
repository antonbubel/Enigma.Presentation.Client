import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { resetConfiguration } from '@state/actions/configuration';
import { RotorsConfigurationModel } from '@models/rotors-configuration.model';
import { ConfigurationModel } from '@models/configuration.model';
import { ApiService } from '@services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'enigma-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  public encryptedText: string = '';
  public encryptionForm: FormGroup;

  public configuration: ConfigurationModel;
  public rotorsConfiguration: RotorsConfigurationModel;

  public constructor(
    private readonly store: Store<AppState>, 
    private readonly formBuilder: FormBuilder,
    private readonly service: ApiService) { }

  public ngOnInit() {
    this.encryptionForm = this.formBuilder.group({ message: '' });

    this.createFormValueChangesSubscription();
    this.createConfigurationStateSubscription();
    this.createRotorConfigurationStateSubscription();
  }

  public ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  public reset() {
    this.store.dispatch(resetConfiguration());
  }

  private createFormValueChangesSubscription() {
    const formValueChangesSubscription = this.encryptionForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(change => {
        this.service.post(`${environment.apiEndpoint}api/enigma/encrypt`, { message: change.message })
          .subscribe(({ message }) => this.encryptedText = message);
      });

    this.subscriptions.push(formValueChangesSubscription);
  }

  private createConfigurationStateSubscription() {
    const configurationStateSubscription = this.store
      .select(state => state.configurationState)
      .subscribe(configurationState => this.configuration = configurationState);

    this.subscriptions.push(configurationStateSubscription);
  }

  private createRotorConfigurationStateSubscription() {
    const rotorConfigurationStateSubscription = this.store
      .select(state => state.rotorsConfigurationState)
      .subscribe(rotorsConfigurationState => this.rotorsConfiguration = rotorsConfigurationState);

    this.subscriptions.push(rotorConfigurationStateSubscription);
  }
}