
import { AuthStateModel } from '@models/auth-state.model';
import { ConfigurationModel } from '@models/configuration.model';
import { RotorsConfigurationModel } from '@models/rotors-configuration.model';

export interface AppState {
  authState: AuthStateModel;
  configurationState: ConfigurationModel;
  rotorsConfigurationState: RotorsConfigurationModel
}
