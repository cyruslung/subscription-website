import { all, takeLatest } from 'redux-saga/effects';
import * as authActions from '../../constants/index';
import * as accountActions from '../../constants';
import authSaga from './auth';
import accountSaga from './account';
import subscribeSaga from './subscribe';
// import braintreeSaga from './BraintreeSaga';

// 單一進入點，一次啟動所有 saga
function* rootSaga() {
  yield all([
    authSaga(),
    accountSaga(),
    subscribeSaga(),
    // braintreeSaga()
  ]);
}

export default rootSaga;