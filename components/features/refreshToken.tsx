import mem from "mem";

import { axiosBase } from "./axiosBase";
import { useSelector } from 'react-redux';



const RefreshTokenFn = async () => {

  const { userToken, userRefreshToken } = useSelector(
    (state: any) => ({
      userToken: state.auth.token,
      userRefreshToken: state.auth.refreshtoken
    })
  );

  try {
    if (typeof window === 'undefined') return; // 在伺服器端不執行相關邏輯

    const response: any = await axiosBase.post("/Member/refreshToken", {
      refreshToken: userRefreshToken?.userRefreshToken,
    });

    const { session } = response.data;

    // if (!session?.accessToken) {
    //   localStorage.removeItem("session");
    //   localStorage.removeItem("user");
    // }

    // localStorage.setItem("session", JSON.stringify(session));

    return session;
  } catch (error) {
    // localStorage.removeItem("session");
    // localStorage.removeItem("user");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(RefreshTokenFn, {
  maxAge,
});