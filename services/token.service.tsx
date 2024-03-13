class TokenService {
  getLocalRefreshToken() {
    const userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    return userInfo?.refreshToken;
  }

  getLocalAccessToken() {
    //const user = JSON.parse(localStorage.getItem("user")!); 
    const userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    //alert(userInfo);
    return userInfo?.token;
  }

  updateLocalAccessToken(data: any) {
    let userInfo = JSON.parse(localStorage.getItem("userinfo") || '{}');
    userInfo.token = data.token;
    userInfo.refreshToken = data.refreshToken;
    //debugger;
    //localStorage.removeItem("user");
    localStorage.setItem("userinfo", JSON.stringify(userInfo));

    //alert("update Token \r\n" + data.token);
  }

  getUser() {
    return JSON.parse(localStorage.getItem("userinfo") || '{}');
  }

  setUser(userInfo: any) {
    //console.log(JSON.stringify(userInfo));
    localStorage.setItem("userinfo", JSON.stringify(userInfo));
  }

  removeUser() {
    localStorage.removeItem("userinfo");
  }
}

export default new TokenService();