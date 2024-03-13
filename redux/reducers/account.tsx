import * as type from "@/constants/index";


const initialAccountState: type.AccountState = {
  accountStatus: []
};
const initialSubscripState: type.SubscripState = {
  subscripStatus: []
};
const initialOrderState: type.OrderState = {
  orderHistoryStatus: [],
};
const initialDeviceState: type.DeviceState = {
  devicesStatus: [],
};

export const accountReducer = (state = initialAccountState, action: any): type.AccountState => {
  switch (action.type) {
    case type.GET_ORDER_HISTORY:
      return {
        ...state,
        accountStatus: action.payload,
      };
    case type.UPDATE_ACCOUNT_EMAIL:
      return {
        ...state,
        accountStatus: action.payload,
      };
    case type.UPDATE_ACCOUNT_PASSWORD:
      return {
        ...state,
        accountStatus: action.payload,
      };
    case type.UPDATE_ACCOUNT_NAME:
      return {
        ...state,
        accountStatus: action.payload,
      };
    case type.UPDATE_ACCOUNT_MOBILE:
      return {
        ...state,
        accountStatus: action.payload,
      };
    default:
      return state;
  }
};

export const subscripStatusReducer = (state = initialSubscripState, action: any): type.SubscripState => {
  switch (action.type) {
    case type.GET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscripStatus: action.payload,
      };
    case type.UPDATE_AUTO_RENEW:
      return {
        ...state,
        subscripStatus: action.payload.isSuccess,
      };
    default:
      return state;
  }
};

export const orderReducer = (state = initialOrderState, action: any): type.OrderState => {
  switch (action.type) {
    case type.GET_ORDER_HISTORY:
      return {
        ...state,
        orderHistoryStatus: action.payload,
      };
    default:
      return state;
  }
};

export const deviceReducer = (state = initialDeviceState, action: any): type.DeviceState => {
  switch (action.type) {
    case type.GET_DEVICE:
      return {
        ...state,
        devicesStatus: action.payload,
      };
    default:
      return state;
  }
};