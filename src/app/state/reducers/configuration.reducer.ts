import reducerCreator from '@tools/reducer-creator';
import * as types from '@state/actions/configuration/types';

export default reducerCreator({ }, {
  [types.CONFIGURATION_SET_FIRST_ROTOR]: (state, { firstRotor }) =>
    Object.assign({ ...state, firstRotor }),

  [types.CONFIGURATION_SET_SECOND_ROTOR]: (state, { secondRotor }) =>
    Object.assign({ ...state, secondRotor }),

  [types.CONFIGURATION_SET_THIRD_ROTOR]: (state, { thirdRotor }) =>
    Object.assign({ ...state, thirdRotor }),

  [types.CONFIGURATION_SET_REFLECTOR]: (state, { reflector }) =>
    Object.assign({ ...state, reflector }),

  [types.CONFIGURATION_SET_THIRD_ROTOR]: (state, { plugboardMap }) =>
    Object.assign({ ...state, plugboardMap }),

  [types.CONFIGURATION_SET]: (state, { firstRotor, secondRotor, thirdRotor, reflector, plugboardMap }) =>
    Object.assign({ ...state, firstRotor, secondRotor, thirdRotor, reflector, plugboardMap }),

  [types.CONFIGURATION_RESET]: (state) =>
    Object.assign({ ...state, firstRotor: null, secondRotor: null, thirdRotor: null, reflector: null, plugboardMap: null })
});
