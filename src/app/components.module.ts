import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from '@components/app.component';
import { NavMenuComponent } from '@components/nav-menu/nav-menu.component';
import { HomeComponent } from '@components/home/home.component';
import { SetupComponent } from '@components/setup/setup.component';
import { MachineComponent } from '@components/machine/machine.component';
import { RotorsConfigurationComponent } from '@components/machine/rotors-configuration/rotors-configuration.component';
import { HowItWorksComponent } from '@components/how-it-works/how-it-works.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    MaterialModule
  ],
  declarations: [
    AppComponent, NavMenuComponent, HomeComponent, 
    SetupComponent, MachineComponent, RotorsConfigurationComponent, 
    HowItWorksComponent
  ],
  exports: [
    AppComponent, NavMenuComponent, HomeComponent, 
    SetupComponent, MachineComponent, RotorsConfigurationComponent,
    HowItWorksComponent
  ]
})
export class ComponentsModule { }
