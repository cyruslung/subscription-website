import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { GET_ACCOUNT, UPDATE_ACCOUNT_EMAIL, UPDATE_ACCOUNT_PASSWORD, UPDATE_ACCOUNT_NAME, UPDATE_ACCOUNT_MOBILE, GET_SUBSCRIPTION_STATUS, UPDATE_AUTO_RENEW, GET_ORDER_HISTORY, GET_DEVICE, DELETE_DEVICE } from '@/constants/index';
import axios from "axios";
import api from "@/services/refreshTokenApi";
import UserService from "@/services/user.service";

// 取得 localStorage 的 jwtToken
let jwtToken = '';
try {
    const userinfo = localStorage.getItem('userinfo');
    if (userinfo) {
        const parsedData = JSON.parse(userinfo);
        jwtToken = parsedData.token || '';
    }
} catch (error) {
    console.error('Error parsing JSON data from localStorage:', error);
}

function* getAccountSaga() {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Member/GetMember');
        const account = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: GET_ACCOUNT, payload: account });
    } catch (error) {
        console.log("error:", error)
    }
}

function* accountEmailSaga() {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Member/UpdateEmail');
        const accountEmail = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: UPDATE_ACCOUNT_EMAIL, payload: accountEmail });
    } catch (error) {
        console.log("error:", error)
    }
}

function* accountPasswordSaga() {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Member/UpdatePassword');
        const accountPassword = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: UPDATE_ACCOUNT_PASSWORD, payload: accountPassword });
    } catch (error) {
        console.log("error:", error)
    }
}

function* accountNameSaga() {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Member/UpdateName');
        const accountName = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: UPDATE_ACCOUNT_NAME, payload: accountName });
    } catch (error) {
        console.log("error:", error)
    }
}

function* accountMobileSaga() {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Member/UpdateMobile');
        const accountMobile = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: UPDATE_ACCOUNT_MOBILE, payload: accountMobile });
    } catch (error) {
        console.log("error:", error)
    }
}

function* getSubcriptionStatusSaga() {
    try {
        const response = yield call(api.post, 'https://api.demo.com/subscription/Order/GetSubcriptionStatus');
        const subscriptionSatus = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        console.log("subscriptionSatus:", subscriptionSatus.data)
        yield put({ type: GET_SUBSCRIPTION_STATUS, payload: subscriptionSatus.data });
    } catch (error) {
        console.log("subscriptionSatus error:", error)
    }
}

function* updateAutoRenewSaga(action: any) {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Order/AutoRenew/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
        });
        const autoRenew = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: UPDATE_AUTO_RENEW, payload: autoRenew });
    } catch (error) {
        console.log("error:", error)
    }
}

function* getOrderHistorySaga(action: any) {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Order/GetOrderHistory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
        });
        const orderHistory = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: GET_ORDER_HISTORY, payload: orderHistory });
    } catch (error) {
        console.log("error:", error)
    }
}

function* getDeviceSaga(action: any) {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Device/GetDevices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
        });
        const devices = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: GET_DEVICE, payload: devices });
    } catch (error) {
        console.log("error:", error)
    }
}

function* deleteDeviceSaga(action: any) {
    try {
        const response = yield fetch('https://api.demo.com/subscription/Device/RemoveDevice', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
        });
        const devices = yield response.json();
        // 這裡可以直接將數據儲存到 state 中
        yield put({ type: GET_DEVICE, payload: devices });
    } catch (error) {
        console.log("error:", error)
    }
}

function* accountSaga() {
    yield takeEvery(GET_ACCOUNT, getAccountSaga);
    yield takeEvery(UPDATE_ACCOUNT_EMAIL, accountEmailSaga);
    yield takeEvery(UPDATE_ACCOUNT_PASSWORD, accountPasswordSaga);
    yield takeEvery(UPDATE_ACCOUNT_NAME, accountNameSaga);
    yield takeEvery(UPDATE_ACCOUNT_MOBILE, accountMobileSaga);
    yield takeEvery(GET_SUBSCRIPTION_STATUS, getSubcriptionStatusSaga);
    yield takeEvery(UPDATE_AUTO_RENEW, updateAutoRenewSaga);
    yield takeEvery(GET_ORDER_HISTORY, getOrderHistorySaga);
    yield takeEvery(GET_DEVICE, getDeviceSaga);
    yield takeEvery(DELETE_DEVICE, deleteDeviceSaga);
}

export default accountSaga;