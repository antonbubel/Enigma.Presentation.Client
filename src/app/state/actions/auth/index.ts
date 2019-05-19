import * as types from './types';
import { CredentialsModel } from '@models/credentials.model';

export const setToken = (id: string, token: string, expires: number) => ({
  type: types.AUTH_SET_TOKEN,
  id,
  token,
  expires
});

export const authenticate = (credentials: CredentialsModel) => ({
  type: types.AUTHENTICATE,
  credentials
});
