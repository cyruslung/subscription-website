import * as type from "@/constants/index";

let initialState: any = {
  authStatus: null
};


const authReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case type.IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload,
      };

    case type.SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload.authStatus,
      };

    case type.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        token: action.payload.token,
        iid: action.payload.iid,
      };

    case type.SIGNIN_FAILED:
      return {
        ...state,
        token: action.payload.token,
        iid: action.payload.iid,
      };

    case type.LOGOUT:

    

    case type.SET_USER_IID:
      var expTime = new Date();
      expTime.setDate(new Date().getDate() + 1);
      if (Boolean(action.payload.remember)) {
        expTime = new Date();
        expTime.setDate(new Date().getDate() + 30);
      }
      return state;

    default:
      return state;
  }
};

export default authReducer;

