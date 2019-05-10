
import { EntityState } from '@ngrx/entity';

import { ConfigurationModel } from '@models/configuration.model';

export interface AppState {
  configurationState: ConfigurationModel
}
