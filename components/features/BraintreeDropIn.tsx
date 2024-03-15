import React, { useEffect, useState } from "react";
import * as dropin from "braintree-web-drop-in";
import { fetchPaymentToken, fetchCreateOrder, fetchCreateCreditOrder } from '@/services/BraintreeApi';

interface CreditOrderPayload {
    testnonce: string;
    testamount: string;
    deviceID: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

const BraintreeDropIn = (props: { show: boolean; token: string; refreshToken: string; onPaymentCompleted: () => void }) => {
    const { show, token, refreshToken, onPaymentCompleted } = props;
    const [braintreeInstance, setBraintreeInstance] = useState<any>(undefined);
    const [paymentToken, setPaymentToken] = useState<string>('');
    const [dataAPI, setDataAPI] = useState(null); // API取得資料
    const [billingFields, setBillingFields] = useState({
        email: '',
        'billing-phone': '',
        'billing-given-name': '',
        'billing-surname': '',
        'billing-street-address': '',
        'billing-extended-address': '',
        'billing-locality': '',
        'billing-region': '',
        'billing-postal-code': '',
        'billing-country-code': ''
    });

    // requestPaymentMethod
    const requestPaymentMethod = async () => {
        const creditObj: CreditOrderPayload = {
            testnonce: '...',
            testamount: '...',
            deviceID: '...',
            firstName: '...',
            lastName: '...',
            phoneNumber: '...',
            address1: '...',
            address2: '...',
            city: '...',
            state: '...',
            zip: '...',
            country: '...',
        };

        try {
            const response = await fetchCreateCreditOrder(creditObj, token);
            if (response.isSuccess) {
                // 成功處理邏輯
                console.error('Create Credit Order: Success');
            } else {
                // 失敗處理邏輯
                console.error('Create Credit Order: Failed');
            }
        } catch (error) {
            console.error('Failed to create credit order:', error);
        }
    };

    const initializeBraintree = async () => {
        if (typeof window === 'undefined') return; // 在伺服器端不執行相關邏輯
        
        // 調用fetchPaymentToken函數
        const userinfo = localStorage.getItem('userinfo');
        const jwtToken = userinfo ? JSON.parse(userinfo).token : '';
        const result = await fetchPaymentToken(jwtToken);
        console.log("userinfo:", userinfo);
        console.log("jwtToken:", jwtToken);
        console.log("result:", result);

        // 獲取paymentToken值
        try {
            const paymentToken = result.paymentToken;
            setPaymentToken(paymentToken); // 儲存 paymentToken 到狀態中
            console.log("paymentToken:", paymentToken);

            // 在異步操作完成後，重新初始化Braintree之前，先清除之前的實例
            if (braintreeInstance) {
                // 代碼檢查braintreeInstance是否存在
                // 調用teardown()方法來清除舊的Braintree實例
                // 在清除完成後，通過then()方法設置回調函數
                // 該回調函數會打印日誌信息，然後調用createNewBraintreeInstance()函數來創建新的Braintree實例。
                braintreeInstance.teardown().then(() => {
                    console.log("Teardown old braintreeInstance");
                    createNewBraintreeInstance(paymentToken);
                });
            } else {
                createNewBraintreeInstance(paymentToken);
            }
        } catch (error) {
            console.error("Failed to fetch payment token:", error);
        }
    };

    // const initializeBraintree = () => {
    //     if (!paymentToken) {
    //         return; // 如果 paymentToken 未定義，則不執行初始化
    //     }

    //     // 重新初始化Braintree之前，先清除之前的實例
    //     if (braintreeInstance) {
    //         // 代碼檢查braintreeInstance是否存在
    //         // 調用teardown()方法來清除舊的Braintree實例
    //         // 在清除完成後，通過then()方法設置回調函數
    //         // 該回調函數會打印日誌信息，然後調用createNewBraintreeInstance()函數來創建新的Braintree實例。
    //         braintreeInstance.teardown().then(() => {
    //             console.log("Teardown old braintreeInstance");
    //             createNewBraintreeInstance();
    //         });
    //     } else {
    //         createNewBraintreeInstance();
    //     }
    // };

    const createNewBraintreeInstance = (paymentToken: any) => {
        console.log("paymentTokenProp:", paymentToken);

        if (!paymentToken) {
            return; // 如果 paymentToken 未定義，則不執行初始化
        }

        dropin.create(
            {
                authorization: paymentToken,
                container: "#braintree-drop-in-div",
                threeDSecure: true,
                dataCollector: true,
            },
            function (error: any, instance: any) {
                if (error) {
                    console.error('create token error:', error);
                    return;
                } else {
                    setBraintreeInstance(instance);
                }
            }
        )
    };

    useEffect(() => {
        // initializeBraintree();

        // if (show && paymentToken) { // 當show為true且paymentToken存在時
        //     initializeBraintree();
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // [show, paymentToken]作為依賴數組傳遞給useEffect，表示只有當show或paymentToken發生變化時，才會重新運行回調函數。

    // Pay button
    const handlePayment = (e: any) => {
        e.preventDefault();

        // 創建訂單並顯示成功訊息
        fetchCreateOrder(token);

        // Briantree 需求
        const { email, 'billing-phone': phoneNumber, 'billing-given-name': givenName, 'billing-surname': surname, 'billing-street-address': streetAddress, 'billing-extended-address': extendedAddress, 'billing-locality': locality, 'billing-region': region, 'billing-postal-code': postalCode, 'billing-country-code': countryCodeAlpha2 } = billingFields;
        if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod({
                threeDSecure: {
                    amount: '50',
                    email,
                    billingAddress: {
                        givenName,
                        surname,
                        phoneNumber: phoneNumber.replace(/[\(\)\s\-]/g, ''),
                        streetAddress,
                        extendedAddress,
                        locality,
                        region,
                        postalCode,
                        countryCodeAlpha2
                    }
                }
            })
        }

        requestPaymentMethod();
    };

    return (
        <div style={{ display: `${show ? "block" : "none"}` }}>
            <div id="braintree-drop-in-div" />

            <button
                className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 mt-4"
                type="button"
                disabled={!braintreeInstance}
                onClick={handlePayment}
            >
                Pay
            </button>
        </div>
    );
}


export default BraintreeDropIn;