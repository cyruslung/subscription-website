// import { put, takeLatest } from 'redux-saga/effects';
// import { FETCH_CLIENT_TOKEN } from '@/constants/BraintreeConstants';
// import { setClientToken } from '@/actions/BraintreeAction';
// import { fetchLoginToken, fetchPaymentToken, fetchCreateOrder, fetchCreateCreditOrder } from '@/services/BraintreeApi';

// function* fetchClientTokenSaga() {
//     try {
//         const clientToken = yield fetchLoginToken();
//         yield put(setClientToken(clientToken));
//     } catch (error) {
//         console.log('Error fetching client token:', error);
//     }
// }

// function* braintreeSaga() {
//     yield takeLatest(FETCH_CLIENT_TOKEN, fetchClientTokenSaga);
// }

// export default braintreeSaga;