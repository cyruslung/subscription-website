import { call, put, takeEvery } from 'redux-saga/effects';
import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILURE, CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../../constants/subscribe';
import { subscribe, checkout, getToken, addToCart } from '@/services/subscribeApi';

function* handleSubscribe(action:any) {
    try {
        const { plan } = action.payload;
        // 調用訂閱的API並將選擇的訂閱方案發送給後端
        yield call(subscribe, plan);
        
        // 將訂閱方案儲存到localStorage中
        localStorage.setItem('selectedPlan', plan);
        // 訂閱成功
        yield put({ type: SUBSCRIBE_SUCCESS, payload: plan });
        // 觸發結帳動作
        yield put({ type: CHECKOUT });
    } catch (error: any) {
        // 訂閱失敗
        yield put({ type: SUBSCRIBE_FAILURE, payload: error.message });
    }
}

function* handleCheckout() {
    try {
        // 呼叫 API 進行結帳
        const response = yield call(checkout);

        // 成功結帳
        yield put({ type: CHECKOUT_SUCCESS, payload: response });
    } catch (error:any) {
        // 結帳失敗
        yield put({ type: CHECKOUT_FAILURE, payload: error.message });
    }
}

function* subscribeSaga() {
    yield takeEvery(SUBSCRIBE, handleSubscribe);
    yield takeEvery(CHECKOUT, handleCheckout);
}

export default subscribeSaga;
