import axios from "axios";
import router from 'next/router';


const API_URL = "https://my-json-server.typicode.com/cyruslung/demo-api/subscription/Member/";

export const register = (account: string, email: string, password: string) => {
  if (typeof window === 'undefined') return;

  return axios.post(API_URL + "users", {
    account,
    email,
    password
  });
};

export const login = (account: string, password: string) => {
  if (typeof window === 'undefined') return;

  return axios
    .post(API_URL + "Login", {
      account,
      password,
    })
    .then((response) => {
      if (response.data.isSuccess) {
        if (response.data.result.token) {

          //localStorage.setItem("user", JSON.stringify(response.data));   
          var userInfodata = {
            token: response.data.result.token,
            refreshToken: response.data.result.refreshToken,
            account: account
          };
          var userInfodataStr = JSON.stringify(userInfodata);
          /*
          var token = response.data.result.token ;
          var refreshToken = response.data.result.refreshToken;
          var userInfo = '{ "token":"' + token +'","refreshToken":"'+refreshToken + '","account":"'+account+ '"}';
          */
          // localStorage.setItem("userinfo", userInfodataStr);
          window.location.reload();

        }
      }
      else {
        alert(response.data.message);
      }
      return response.data;
    })
    .catch(
      (response: any) => {

        return response.data;
      }
    );
};

export const logout = () => {
  if (typeof window === 'undefined') return;

  // localStorage.removeItem("userinfo");

  window.location.reload();
  router.push('/precisionX1');
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return;

  // const userStr = localStorage.getItem("userinfo");
  // if (userStr) {
  //   return JSON.parse(userStr);
  // }
  // else
  //   return null;
};

