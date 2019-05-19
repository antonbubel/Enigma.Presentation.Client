import reducerCreator from '@tools/reducer-creator';
import * as types from '@state/actions/configuration/rotors-configuration/types';

import letters from '@constants/letters';
const [ defaultLetter ] = letters;

const initialState = {
  firstLetter: defaultLetter,
  secondLetter: defaultLetter,
  thirdLetter: defaultLetter
};

export default reducerCreator(initialState, {
  [types.ROTORS_CONFIGURATION_SET_FIRST_ROTOR_LETTER]: (state, { firstLetter }) =>
    Object.assign({ ...state, firstLetter }),

  [types.ROTORS_CONFIGURATION_SET_SECOND_ROTOR_LETTER]: (state, { secondLetter }) =>
    Object.assign({ ...state, secondLetter }),

  [types.ROTORS_CONFIGURATION_SET_THIRD_ROTOR_LETTER]: (state, { thirdLetter }) =>
    Object.assign({ ...state, thirdLetter }),

  [types.ROTORS_CONFIGURATION_SET_LETTERS]: (state, { firstLetter, secondLetter, thirdLetter }) =>
    Object.assign({ ...state, firstLetter, secondLetter, thirdLetter }),

  [types.ROTORS_CONFIGURATION_RESET]: (state) =>
    Object.assign({ ...state, ...initialState })
});
