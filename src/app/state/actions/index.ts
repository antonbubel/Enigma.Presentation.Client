import * as types from './types';

export const setFirstRotor = (firstRotor: number) => ({
  type: types.CONFIGURATION_SET_FIRST_ROTOR,
  firstRotor
});

export const setSecondRotor = (secondRotor: number) => ({
  type: types.CONFIGURATION_SET_THIRD_ROTOR,
  secondRotor
});

export const setThirdRotor = (thirdRotor: number) => ({
  type: types.CONFIGURATION_SET_THIRD_ROTOR,
  thirdRotor
});

export const setReflector = (reflector: number) => ({
  type: types.CONFIGURATION_SET_REFLECTOR,
  reflector
});

export const setPlugboardMap = (plugboardMap: string) => ({
  type: types.CONFIGURATION_SET_PLUGBOARD_MAP,
  plugboardMap
});

export const setConfiguration = (
  firstRotor: number,
  secondRotor: number,
  thirdRotor: number,
  reflector: number,
  plugboardMap: string
) => ({
  type: types.CONFIGURATION_SET,
  firstRotor,
  secondRotor,
  thirdRotor,
  reflector,
  plugboardMap
});

export const resetConfiguration = () => ({
  type: types.CONFIGURATION_RESET
});
