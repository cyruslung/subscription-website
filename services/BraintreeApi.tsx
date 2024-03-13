const host = "https://api.demo.com/subscription/";
const loginTokenAPI = host + "member/login";
const paymentTokenAPI = host + "Payment/getpaymenttoken";
const createOrderAPI = host + "Payment/createorder";
const createCreditOrderAPI = host + "Payment/CreateCreditOrder";

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

interface ApiResponse {
    isSuccess: boolean;
    message: string;
    result?: string;  // 將 result 屬性改為可選
}

// 登錄並獲取token和refreshToken
export const fetchLoginToken = async () => {
    const loginObj = {
        account: 'aalee0406',
        password: 'demo0406',
    };

    try {
        const response = await fetch(loginTokenAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginObj),
        });

        const data = await response.json();
        return {
            jwtToken: data.result.token,
            refreshToken: data.result.refreshToken,
        };
    } catch (error) {
        console.error('Error fetching login token:', error);
        throw error;
    }
};

// 獲取paymentToken
export const fetchPaymentToken = async (jwtToken: string) => {
    try {
        const response = await fetch(paymentTokenAPI, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.result) {
                return {
                    paymentToken: data.result,
                };
            } else {
                throw new Error('Payment token not found in response data');
            }
        } else {
            throw new Error(`Error fetching payment token. Status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching payment token:', error);
        throw error;
    }
};

// 創建訂單並顯示成功訊息
export const fetchCreateOrder = async (token: string): Promise<ApiResponse> => {
    try {
        const orderObj = {
            paymentType: 1,
            planID: "E76F665A-1129-4D26-9B88-4ECE7DB42807",
        };

        const response = await fetch(createOrderAPI, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderObj),
        });

        if (response.ok) {
            console.log("Order created successfully.");
            const result = await response.json();

            return {
                isSuccess: true,
                message: "Order created successfully.",
                result: result, // 回應中有一個result屬性代表訂單編號，將解析的結果指派給 result 屬性
            };
        } else {
            console.log("Failed to create order.");

            return {
                isSuccess: false,
                message: 'Failed to create order',
            };
        }

    } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
    }
};

// 創建createCreditOrder並顯示payTest
export const fetchCreateCreditOrder = async (creditObj: CreditOrderPayload, token: string): Promise<ApiResponse> => {
    try {
        const payTest = JSON.stringify(creditObj);

        const response = await fetch(createCreditOrderAPI, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: payTest,
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("payTest:", responseData);

            return {
                isSuccess: true,
                message: 'Success',
            };
        } else {
            return {
                isSuccess: false,
                message: 'Failed to create credit order',
            };
        }
    } catch (error) {
        console.error("Failed to create credit order:", error);
        throw error;
    }
};


// export const fetchCreateCreditOrder2 = async (
//     nonce: string,
//     amount: number,
//     deviceID: string,
//     token: string
// ): Promise<ApiResponse> => {
//     try {
//         const creditObj = {
//             testnonce: nonce,
//             testamount: amount,
//             deviceID: deviceID,
//         };

//         const response = await fetch(createCreditOrderAPI, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(creditObj),
//         });

//         if (response.ok) {
//             console.log("Credit order created successfully.");

//             return {
//                 isSuccess: true,
//                 message: "Credit order created successfully.",
//             };
//         } else {
//             console.log("Failed to create credit order.");

//             return {
//                 isSuccess: false,
//                 message: "Failed to create credit order",
//             };
//         }
//     } catch (error) {
//         console.error("Failed to create credit order:", error);
//         throw error;
//     }
// };
