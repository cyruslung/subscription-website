import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILURE, CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../../constants/subscribe';

const initialState = {
    selectedPlan: '', // 初始化為空字符串
};

const subscribeReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                selectedPlan: action.payload,
            };

        case CHECKOUT:
            return state;
        case CHECKOUT_SUCCESS:
            // 處理結帳成功的邏輯
            return state;
        case CHECKOUT_FAILURE:
            // 處理結帳失敗的邏輯
            return state;
        default:
            return state;
    }
};

export default subscribeReducer;
