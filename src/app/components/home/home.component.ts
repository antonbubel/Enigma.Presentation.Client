import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';

import { Subscription } from 'rxjs';
import { ConfigurationModel } from '@models/configuration.model';
import { loadRotorsConfiguration } from '@state/actions/configuration/rotors-configuration';
import { loadConfiguration } from '@state/actions/configuration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  public userAuthenticated = false;
  public machineConfigured = false;
  private subscriptions: Array<Subscription> = [];

  public constructor(private readonly store: Store<AppState>) { }

  public ngOnInit() {
    this.subscribeForAuthStateChanges();
    this.subscribeForConfigurationStateChanges();
  }

  public ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  private subscribeForAuthStateChanges() {
    const authStateSubscription = this.store
      .select(state => state.authState)
      .subscribe(authState => {
        this.userAuthenticated = <any>authState.token
      
        if (this.userAuthenticated) {
          this.store.dispatch(loadConfiguration())
          this.store.dispatch(loadRotorsConfiguration())
        }
      });

    this.subscriptions.push(authStateSubscription);
  }

  private subscribeForConfigurationStateChanges() {
    const configurationStateSubscription = this.store
      .select(state => state.configurationState)
      .subscribe(configurationState => 
        this.machineConfigured = this.ensureMashineConfigured(configurationState))

    this.subscriptions.push(configurationStateSubscription);
  }

  private ensureMashineConfigured(configurationState: ConfigurationModel): boolean {
    const configurationSections = Object.values(configurationState);

    return configurationSections.length 
      && !configurationSections.some(value => !value);
  }
}
