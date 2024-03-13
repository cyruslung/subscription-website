import * as type from '@/constants/index';

export const getAccount = () => ({
  type: type.GET_ACCOUNT
});

export const updateAccountEmail = (verificationID: any, prefix: string, suffix: string, newEmail: string) => ({
  type: type.UPDATE_ACCOUNT_EMAIL, // type 屬性通常會是字串並用來指定這個 Action 類型的名稱
  payload: { verificationID, prefix, suffix, newEmail } // payload 屬性則是用來做處理該 Action 物件被執行時需要添加或處理的資料內容（payload 這個屬性是非必要的，所以可以視需求加入即可）
});

export const updateAccountPassword = (data: any) => ({
  type: type.UPDATE_ACCOUNT_PASSWORD, // type 屬性的命名方式通常會使用 事件分類/事件名稱
  payload: data
});

export const updateAccountName = (data: any) => ({
  type: type.UPDATE_ACCOUNT_NAME,
  payload: data
});

export const updateAccountMobile = (data: any) => ({
  type: type.UPDATE_ACCOUNT_MOBILE,
  payload: data
});

export const getSubcriptionStatus = (productNO: any) => ({
  type: type.GET_SUBSCRIPTION_STATUS,
  payload: { productNO }
});

export const updateAutoRenew = (data: any) => ({
  type: type.UPDATE_AUTO_RENEW,
  payload: data
});

export const getOrderHistory = () => ({
  type: type.GET_ORDER_HISTORY,
});

export const getDevice = () => ({
  type: type.GET_DEVICE
});

export const deleteDevice = (id: any) => ({
  type: type.DELETE_DEVICE,
  payload: id
});