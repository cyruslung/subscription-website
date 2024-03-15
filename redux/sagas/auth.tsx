import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { SIGNIN } from "@/constants/index";
import { signInSuccessful, signInFailed, setAuthenticating } from "@/actions/auth";

function* signIn({ payload }: any): any {
  if (typeof window === 'undefined') return;

  try {
    const { account, password, userIP, remember, googleToken } = payload;

    // 呼叫 API 進行登入
    const response = yield call(fetch, "https://my-json-server.typicode.com/cyruslung/demo-api/subscription/Member/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account, password }),
    });

    // 解析回傳的資料
    const data = yield response.json();

    // 處理登入成功的情況
    if (data.success) {
      // 儲存使用者資訊到本地端
      // localStorage.setItem("user", JSON.stringify(data.user));

      // 更新認證狀態和認證成功的資料
      yield put(setAuthenticating(false));
      // 登錄成功，將用戶姓名傳遞給 Redux store
      yield put(signInSuccessful(data));
    }
  } catch (error) {
    // 處理登錄失敗的情況
    yield put(signInFailed(error) )
    console.error("Error login:", error);
  }
}

function* accountSaga() {
  yield takeEvery(SIGNIN, signIn);
}

export default accountSaga;
