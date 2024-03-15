import axios from "axios";
import TokenService from "./token.service";


const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/cyruslung/demo-api/subscription",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      //config.headers["x-access-token"] = token ; // for Node.js Express back-end 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

var i = 0;
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig?.url !== "/Member/Login" && err.response) {
      // Access Token was expired 

      if (err.response.status === 401 && !originalConfig._retry && originalConfig?.url !== "/Member/refreshToken") {
        originalConfig._retry = true;
        try {

          const tokenStr = TokenService.getLocalAccessToken();
          const refreshTokenStr = TokenService.getLocalRefreshToken();
          const rs = await instance.post("/Member/refreshToken", {
            token: tokenStr,
            refreshToken: refreshTokenStr
          })


          TokenService.updateLocalAccessToken(rs.data);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;