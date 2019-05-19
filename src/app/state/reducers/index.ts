import authReducer from './auth.reducer';
import configurationReducer from './configuration.reducer';
import rotorsConfigurationReducer from './rotors-configuration.reducer';

export const reducers = {
  authState: authReducer,
  configurationState: configurationReducer,
  rotorsConfigurationState: rotorsConfigurationReducer
};
