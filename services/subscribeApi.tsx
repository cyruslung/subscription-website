import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/cyruslung/demo-api/subscription'; // 根據實際的API地址進行修改

export const subscribe = async (plan: string) => {
    try {
        // 調用訂閱的API並將選擇的訂閱方案發送給後端
        const response = await axios.get(`${API_BASE_URL}/Product/GetSubscriptionPlan?productNO=P000001`);
        return response.data;
    } catch (error) {
        throw new Error('訂閱失敗');
    }
};

export const addToCart = async (productId: number) => {
    try {
        // 調用添加到購物車的API
        const response = await axios.post(`${API_BASE_URL}/addToCart`, { productId });
        return response.data;
    } catch (error) {
        throw new Error('新增商品到購物車失敗');
    }
};

export const checkout = async () => {
    try {
        // 調用結賬的API
        const response = await axios.post(`${API_BASE_URL}/Payment/createorder`);
        return response.data;
    } catch (error) {
        throw new Error('結賬失敗');
    }
};

export const getToken = async () => {
    try {
        // 調用獲取Token的API
        const response = await axios.post(`${API_BASE_URL}/Payment/getpaymenttoken`);
        return response.data;
    } catch (error) {
        throw new Error('獲取Token失敗');
    }
};

export const createOrder = async () => {
    try {
        // 調用創建訂單的API
        const response = await axios.post(`${API_BASE_URL}/Payment/createorder`);
        return response.data;
    } catch (error) {
        throw new Error('創建訂單失敗');
    }
};
