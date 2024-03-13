import { applyMiddleware, compose, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger'

import rootReducers from "redux/reducers/index";
import rootSaga from 'redux/sagas/index';


// redux-persist持久化資料儲存相關設定
const persistConfig = {
    keyPrefix: "Subscription-",
    key: "Root",
    storage,
    whitelist: ['subscribe'], // 指定要持久化的 reducer
}

// 使用 persistReducer 將 rootReducers 和 persistConfig 結合起來，建立一個 persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Redux Dev Tool 追蹤state跟Action

const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context: any) => {
    const store: any = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger))); // logger 一定要設置在最後一個
    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store); // 使用 persistStore 將 store 儲存起來
    return store;
};

// 使用 createWrapper 將 makeStore 和一個 debug 屬性傳入，建立一個 wrapper。這個 wrapper 可以用來將 Redux store 與 Next.js 整合起來
export const wrapper = createWrapper(makeStore, { debug: Boolean(process.env.ShowDebug) });