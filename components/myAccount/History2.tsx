import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Tab } from '@headlessui/react'
import UService from "@/services/user.service";
import moment from "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '@/actions/account';
import { RootState } from '@/reducers/index';
import { Order } from '@/constants/index';
import {
    getAccount,
    updateAccountEmail,
    updateAccountPassword,
    updateAccountProfile,
    updateAccountMobile,
    getSubcription,
    updateAutoRenewal,
    getOrderHistory,
    getDevice,
    deleteDevice
} from "@/actions/account";
import accountReducer from '@/reducers/account'

const History: React.FC = () => {
    const dispatch = useDispatch();
    const orderHistory = useSelector((state: RootState) => state.order.orderHistory);

    useEffect(() => {
        dispatch(fetchOrderHistory());
    }, [dispatch]);

    if (!orderHistory) {
        return <div>Loading...</div>; // 渲染加载状态
    }

    if (orderHistory.length === 0) {
        return <div>No orders found.</div>; // 渲染无订单提示
    }

    return (
        <Tab.Panel className="text-white p-5">
            <div className="mx-auto mb-2 sm:mb-6">
                <p className=" text-lg sm:text-xl text-left leading-relaxed sm:leading-relaxed text-white mb-4" > Payment history </p>
            </div>

            <div className="mx-auto mb-2">
                <div className="relative overflow-x-auto shadow-md">
                    <table className="table-auto w-full text-base text-left text-neutral-400">
                        <thead className="text-xs uppercase text-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"> DATE </th>
                                <th scope="col" className="px-6 py-3"> DESCRIBE </th>
                                <th scope="col" className="px-6 py-3 text-right"> TOTAL </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order: Order) => (
                                <tr key={order.orderID} className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {moment.utc(order.orderUtcDateTime).tz("America/Los_Angeles").format("MMDDYY")}
                                    </th>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center">
                                            <span className="text-white"> {order.productName}</span>
                                            <span className="py-1 px-4 ml-4 rounded-xl text-base font-semibold text-white bg-violet-700" > {order.planName} </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        ${order.totalPrice}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </Tab.Panel>
    );
};

export default History;