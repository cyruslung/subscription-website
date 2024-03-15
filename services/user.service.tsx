import api from "./refreshTokenApi";


// Demo.Subscription.Api - Member
export const getUserBoard = () => {
  if (typeof window === 'undefined') return;

  return api.get("member/login");
};

export const exeLogout = () => {
  if (typeof window === 'undefined') return;

  // localStorage.removeItem("userinfo");
  debugger;
};

export const getClientIP = () => {
  if (typeof window === 'undefined') return;

  return api.get("https://geolocation-db.com/json/");
};

export const getMember = () => {
  if (typeof window === 'undefined') return;

  // const userInfo: any = JSON.parse(localStorage.getItem("userinfo") || '{}');
  // return api.post("/Member/getmember", { "account": userInfo.account })
};

export const updateEmail = (newEmail: any, requestIP: any) => {
  if (typeof window === 'undefined') return;

  debugger;
  return api.post("/Member/UpdateEmail", { "newEmail": newEmail, "requestIP": requestIP })
};

export const verifiEmail = (verificationID: any, newEmail: any, prefixCode: any, suffixCode: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Member/VerifiEmail", { "verificationID": verificationID, "newEmail": newEmail, "prefixCode": prefixCode, "suffixCode": suffixCode })
};

export const updatePassword = (oldpassword: any, newpassword: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Member/UpdatePassword", { "oldPassword": oldpassword, "newPassword": newpassword })
};

export const updateName = (firstName: any, lastName: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Member/UpdateName", { "firstName": firstName, "lastName": lastName })
};

export const updateMobile = (phoneCode: any, phoneNo: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Member/UpdateMobile", { "phoneCode": phoneCode, "phoneNo": phoneNo })
};

// Demo.Subscription.Api - Order
export const getSubscriptionStatus = () => {
  if (typeof window === 'undefined') return;

  return api.post("/Order/GetSubscriptionStatus", { "productNO": "P000001" })
};

export const updateAutoRenew = (memberPlanID: any, autoRenew: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Order/AutoRenew", { "memberPlanID": memberPlanID, "autoRenew": autoRenew })
};

export const getOrderHistory = () => {
  if (typeof window === 'undefined') return;

  // const userInfo: any = JSON.parse(localStorage.getItem("userinfo") || '{}');
  return api.post("/Order/GetOrderHistory", { "productNO": "P000001" })
};

// Demo.Subscription.Api - Device
export const getDevices = () => {
  if (typeof window === 'undefined') return;

  return api.post("/Device/GetDevices");
};

export const removeDevice = (memberDeviceID: any) => {
  if (typeof window === 'undefined') return;

  debugger;
  return api.post("/Device/RemoveDevice", { "memberDeviceID": memberDeviceID });
};

// Demo.Subscription.Api - Payment
export const getpaymenttoken = () => {
  if (typeof window === 'undefined') return;

  return api.get("/Payment/getpaymenttoken")
};

export const createorder = (paymentType: any, planID: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Payment/createorder", { "paymentType": paymentType, "planID": planID })
};

export const createcreditorder = (orderID: any, clientResponse: any, deviceData: any, firstName: any, lastName: any, phoneNumber: any, address1: any, address2: any, city: any, state: any, zip: any, country: any,) => {
  if (typeof window === 'undefined') return;

  return api.post("/Payment/createcreditorder", { "orderID": orderID, "clientResponse": clientResponse, "deviceData": deviceData, "firstName": firstName, "lastName": lastName, "phoneNumber": phoneNumber, "address1": address1, "address2": address2, "city": city, "state": state, "zip": zip, "country": country })
};

export const createpaypalorder = (orderID: any, clientResponse: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Payment/createpaypalorder", { "orderID": orderID, "clientResponse": clientResponse })
};

// Demo.Subscription.Api - Product
export const getOrders = (productNO: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Product/GetOrders", { "productNO": productNO })
};

export const addDevice = (deviceKey: any, deviceInfom: any, orderID: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Product/AddDevice", { "deviceKey": deviceKey, "deviceInfom": deviceInfom, "orderID": orderID })
};

export const getStatus = (productNO: any, deviceKey: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Product/GetStatus", { "productNO": productNO, "deviceKey": deviceKey })
};

export const removedevice = (memberDeviceID: any) => {
  if (typeof window === 'undefined') return;

  return api.post("/Product/RemoveDevice", { "memberDeviceID": memberDeviceID })
};

export const getSubscriptionPlan = () => {
  if (typeof window === 'undefined') return;

  return api.get("/Product/GetSubscriptionPlan", { params: { "productNO": "P000001" } })
};

const UserService = {
  getMember,
  getClientIP,
  updateEmail,
  verifiEmail,
  updatePassword,
  updateName,
  updateMobile,
  getSubscriptionStatus,
  updateAutoRenew,
  getOrderHistory,
  getDevices,
  removeDevice,
  exeLogout,
  getpaymenttoken,
  createorder,
  createcreditorder,
  createpaypalorder,
  getOrders,
  addDevice,
  getStatus,
  removedevice,
  getSubscriptionPlan
};

export default UserService;