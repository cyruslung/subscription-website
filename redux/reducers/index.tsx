import { combineReducers } from 'redux';
import authreducer from "redux/reducers/auth";
import { accountReducer, subscripStatusReducer, orderReducer, deviceReducer } from "redux/reducers/account";
import subscribeReducer from "redux/reducers/subscribe";
// import braintreeReducer from "redux/reducers/BraintreeReducer";


const rootReducers = combineReducers({
    auth: authreducer,
    account: accountReducer,
    subscripStatus: subscripStatusReducer,
    order: orderReducer,
    device: deviceReducer,
    subscribe: subscribeReducer,
    // braintree: braintreeReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
export default rootReducers;