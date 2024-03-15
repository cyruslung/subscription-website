class TokenService {
  getLocalRefreshToken() {
    if (typeof window === 'undefined') return;

    // const userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    // return userInfo?.refreshToken;
  }

  getLocalAccessToken() {
    if (typeof window === 'undefined') return;

    //const user = JSON.parse(localStorage.getItem("user")!); 
    // const userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    //alert(userInfo);
    // return userInfo?.token;
  }

  updateLocalAccessToken(data: any) {
    if (typeof window === 'undefined') return;

    // let userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    // userInfo.token = data.token;
    // userInfo.refreshToken = data.refreshToken;
    //debugger;
    //localStorage.removeItem("user");
    // localStorage.setItem("userinfo", JSON.stringify(userInfo));

    //alert("update Token \r\n" + data.token);
  }

  getUser() {
    if (typeof window === 'undefined') return;

    // return JSON.parse(localStorage.getItem("userinfo") || '{}');
  }

  setUser(userInfo: any) {
    if (typeof window === 'undefined') return;

    //console.log(JSON.stringify(userInfo));
    // localStorage.setItem("userinfo", JSON.stringify(userInfo));
  }

  removeUser() {
    if (typeof window === 'undefined') return;
    
    // localStorage.removeItem("userinfo");
  }
}

export default new TokenService();