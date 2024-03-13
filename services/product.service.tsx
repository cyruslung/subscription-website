import api from "./refreshTokenApi";

export const getProductContent = () => {
  return api.get("/Product/GetSubscriptionPlan?productNO=P000001")
};