export default interface IUser {
  id?: any | null,
  username: string,
  email: string,
  confirmEmail: string,
  password: string,
  confirmPassword: string,
  roles?: Array<string>
}

export interface LoginData {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
}

export interface User {
  name: string;
  token: string;
}

export interface AuthState {
  loggedIn: boolean;
  user: User | null;
  token: null;
  error: string;
}

export interface AuthAction {
  type: string;
  payload?: any;
}

export interface RootState {
  auth: AuthState;
}
