import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';

import { setConfiguration } from '@state/actions';

import { SelectOptionModel } from '@models/select-option.model';

import selectListCreator from '@tools/select-list-creator';

import defaultPlugboardMap from '@constants/default-plugboard-map';
import rotorTypes from '@constants/rotor-variation-types';
import rotorTypeNames from '@constants/rotor-variation-type-names';
import reflectorTypes from '@constants/reflector-variation-types';
import reflectorTypeNames from '@constants/reflector-variation-type-names';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public rotorsSetupFormGroup: FormGroup;
  public reflectorSetupFormGroup: FormGroup;
  public plugboardSetupFormGroup: FormGroup;

  public rotors: SelectOptionModel[] =
    selectListCreator(rotorTypes, rotorTypeNames);

  public reflectors: SelectOptionModel[] =
    selectListCreator(reflectorTypes, reflectorTypeNames);

  public constructor(private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>) { }

  public ngOnInit() {
    this.rotorsSetupFormGroup = this.formBuilder.group({
      firstRotor: [rotorTypes.firstRotor, Validators.required],
      secondRotor: [rotorTypes.secondRotor, Validators.required],
      thirdRotor: [rotorTypes.thirdRotor, Validators.required]
    });
    this.reflectorSetupFormGroup = this.formBuilder.group({
      reflector: [reflectorTypes.firstReflector, Validators.required]
    });
    this.plugboardSetupFormGroup = this.formBuilder.group({
      plugboard: [defaultPlugboardMap, Validators.pattern(/^[A-Z]{26}$/)] });
  }

  public getRotorName(rotorType: number) {
    return rotorTypeNames[rotorType];
  }

  public getReflectorName(reflectorType: number) {
    return reflectorTypeNames[reflectorType];
  } 

  public submit() {
    const { firstRotor, secondRotor, thirdRotor } = this.rotorsSetupFormGroup.value;
    const { reflector } = this.reflectorSetupFormGroup.value;
    const { plugboard } = this.plugboardSetupFormGroup.value;

    this.store.dispatch(setConfiguration(
      firstRotor,
      secondRotor,
      thirdRotor,
      reflector,
      plugboard
    ));
  }
}
