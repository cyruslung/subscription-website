interface CartItem {
    id: number;
    productNO: string;
    planID: number;
    productName: string;
    planName: string;
    period: string;
    msrp: number;
    sellPrice: number;
    monthQuantity: number;
    deviceQuantity: number;
    brief: string;
    renewInfo: string;
}

export default CartItem;
