import { bool } from 'yup';
import * as type from '@/constants/index';

export const signIn = (account: string, password: string, userIP: string, remember: boolean, googleToken: string) => ({
  type: type.SIGNIN,
  payload: {account, password, userIP, remember, googleToken}
});

export const setUserIID = (iid: string, remember:boolean) => ({
  type: type.SET_USER_IID,
  payload: {
    iid,
    remember
  }
});

export const signInSuccessful = (auth: any) => ({
  type: type.SIGNIN_SUCCESSFUL,
  payload: auth
});

export const signInFailed = (error: any) => ({
  type: type.SIGNIN_FAILED,
  payload: error
});

export const logout = (data: any) => ({
  type: type.LOGOUT,
});




export const setAuthenticating = (bool = true) => ({
  type: type.IS_AUTHENTICATING,
  payload: bool
});

export const setAuthStatus = (authStatus:any) => ({
  type: type.SET_AUTH_STATUS,
  payload: {
    authStatus
  }
});