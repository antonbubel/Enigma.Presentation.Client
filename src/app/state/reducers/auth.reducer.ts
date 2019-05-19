import reducerCreator from '@tools/reducer-creator';
import * as types from '@state/actions/auth/types';

export default reducerCreator({}, {
  [types.AUTH_SET_TOKEN]: (state, { id, token, expires }) =>
    Object.assign({ ...state, id, token, expires }),

  [types.AUTH_RESET_TOKEN]: () => {}
});
