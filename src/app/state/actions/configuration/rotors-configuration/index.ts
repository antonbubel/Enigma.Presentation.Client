import * as types from './types';

export const setFirstRotorLetter = (firstLetter: string) => ({
  type: types.ROTORS_CONFIGURATION_SET_FIRST_ROTOR_LETTER,
  firstLetter
});

export const setSecondRotorLetter = (secondLetter: string) => ({
  type: types.ROTORS_CONFIGURATION_SET_SECOND_ROTOR_LETTER,
  secondLetter
});

export const setThirdRotorLetter = (thirdLetter: string) => ({
  type: types.ROTORS_CONFIGURATION_SET_THIRD_ROTOR_LETTER,
  thirdLetter
});

export const setRotorLetters = (
  firstLetter: string,
  secondLetter: string,
  thirdLetter: string
) => ({
  type: types.ROTORS_CONFIGURATION_SET_LETTERS,
  firstLetter,
  secondLetter,
  thirdLetter
});

export const resetRotorLetters = ({
  type: types.ROTORS_CONFIGURATION_RESET
});

export const loadRotorsConfiguration = () => ({
  type: types.ROTORS_CONFIGURATION_LOAD
});

export const saveRotorsConfiguration = (
  firstLetter: string,
  secondLetter: string,
  thirdLetter: string
) => ({
  type: types.ROTORS_CONFIGURATION_SAVE,
  firstLetter,
  secondLetter,
  thirdLetter
});
