import { SUBSCRIBE, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILURE, CHECKOUT, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../../constants/subscribe';

export const subscribe = (plan:any) => ({
    type: SUBSCRIBE,
    payload: plan,
});

// export const subscribeSuccess = (plan:any) => ({
//     type: SUBSCRIBE_SUCCESS,
//     payload: plan,
// });

// export const subscribeFailure = (plan:any) => ({
//     type: SUBSCRIBE_FAILURE,
//     payload: plan,
// });

export const checkout = () => ({
    type: CHECKOUT,
});

export const checkoutSuccess = () => ({
    type: CHECKOUT_SUCCESS,
});

export const checkoutFailure = () => ({
    type: CHECKOUT_FAILURE,
});
