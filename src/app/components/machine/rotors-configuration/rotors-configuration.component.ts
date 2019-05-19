import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RotorsConfigurationModel } from '@models/rotors-configuration.model';

import { saveRotorsConfiguration } from '@state/actions/configuration/rotors-configuration';

import letters from '@constants/letters';

@Component({
  selector: 'rotors-configuration',
  templateUrl: './rotors-configuration.component.html',
  styleUrls: ['./rotors-configuration.component.scss']
})
export class RotorsConfigurationComponent implements OnInit, OnDestroy {

  private rotorsConfiguration: RotorsConfigurationModel;
  private subscriptions: Array<Subscription> = [];

  public letters: string[];
  public rotorsConfigurationForm: FormGroup;

  public constructor(
    private readonly store: Store<AppState>,
    private readonly formBuilder: FormBuilder) {

    this.letters = letters;
  }

  public ngOnInit() {
    this.createRotorsConfigurationStateSubscription();
  }

  public ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  private createRotorsConfigurationStateSubscription() {
    const rotorsConfigurationStateSubscription = this.store
      .select(state => state.rotorsConfigurationState)
      .subscribe(rotorsConfigurationState => {
        if (!this.rotorsConfigurationForm) {
          this.rotorsConfigurationForm = this.formBuilder.group({
            ...rotorsConfigurationState
          });

          this.createFormValueChangesSubscription();
        }
        else {
          this.rotorsConfigurationForm.setValue({
            ...rotorsConfigurationState
          });
        }

        this.rotorsConfiguration = rotorsConfigurationState;
      });

    this.subscriptions.push(rotorsConfigurationStateSubscription);
  }

  private createFormValueChangesSubscription() {
    const formValueChangesSubscription = this.rotorsConfigurationForm.valueChanges
      .subscribe(change => {
        const { firstLetter, secondLetter, thirdLetter } = change;

        if (
          this.rotorsConfiguration.firstLetter !== firstLetter ||
          this.rotorsConfiguration.secondLetter !== secondLetter ||
          this.rotorsConfiguration.thirdLetter !== thirdLetter
        ) {
          this.store.dispatch(saveRotorsConfiguration(firstLetter, secondLetter, thirdLetter));
        }
      });

    this.subscriptions.push(formValueChangesSubscription);
  }
}
