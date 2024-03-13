// import { SET_CLIENT_TOKEN, SET_NONCE, SET_LIABILITY_SHIFTED } from '@/constants/BraintreeConstants';

// const initialState = {
//     billingFields: {
//         email: '',
//         'billing-phone': '',
//         'billing-given-name': '',
//         'billing-surname': '',
//         'billing-street-address': '',
//         'billing-extended-address': '',
//         'billing-locality': '',
//         'billing-region': '',
//         'billing-postal-code': '',
//         'billing-country-code': '',
//     },
//     clientToken: '',
//     nonce: '',
//     liabilityShifted: false,
// };

// const braintreeReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case SET_CLIENT_TOKEN:
//             return { ...state, clientToken: action.payload };
//         case SET_NONCE:
//             return { ...state, nonce: action.payload };
//         case SET_LIABILITY_SHIFTED:
//             return { ...state, liabilityShifted: action.payload };
//         default:
//             return state;
//     }
// };

// export default braintreeReducer;
