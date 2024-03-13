export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL'; // 登錄成功
export const SIGNIN_FAILED = 'SIGNIN_FAILED'; // 登錄失敗
export const LOGOUT = 'LOGOUT';

export const SET_USER_IID = 'SET_USER_IID'; // 設置用戶 IID
export const IS_AUTHENTICATING = 'IS_AUTHENTICATING'; // 正在認證
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS'; // 設置授權狀態

export const GET_ACCOUNT = 'GET_ACCOUNT';
export const UPDATE_ACCOUNT_EMAIL = 'UPDATE_ACCOUNT_EMAIL';
export const UPDATE_ACCOUNT_PASSWORD = 'UPDATE_ACCOUNT_PASSWORD';
export const UPDATE_ACCOUNT_NAME = 'UPDATE_ACCOUNT_NAME';
export const UPDATE_ACCOUNT_MOBILE = 'UPDATE_ACCOUNT_MOBILE';

export const GET_SUBSCRIPTION_STATUS = 'GET_SUBSCRIPTION_STATUS';
export const UPDATE_AUTO_RENEW = 'UPDATE_AUTO_RENEW';
export const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';
export const GET_DEVICE = 'GET_DEVICE';
export const DELETE_DEVICE = 'DELETE_DEVICE';

export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE'; // 設置狀態信息
export const RESET_MISC_STATE = 'RESET_MISC_STATE'; // 重置雜項狀態




export interface Account { id: number; account: string; email: string; customerID: number; globalID: number; lastName: string; firstName: string; phoneCode: number; phone: number; active: boolean; }
export interface AccountState { accountStatus: Account[]; }

export interface Subscrip { orderID: number; orderNO: string; productName: string; planName: string; startUtcDate: string; endUtcDate: string; deviceTotal: string; deviceRegistered: string; memberPlanID: string; autoRenew: string; }
export interface SubscripState { subscripStatus: Subscrip[]; }

export interface Order { orderID: number; orderNO: string; productName: string; planName: string; orderUtcDateTime: string; totalPrice: string; }
export interface OrderState { orderHistoryStatus: Order[]; }

export interface Device { deviceID: string; memberPlanID: string; deviceName: string; registeredUtcDateTime: string; }
export interface DeviceState { devicesStatus: Device[]; }