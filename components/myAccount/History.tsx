import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Tab } from '@headlessui/react'
import UService from "@/services/user.service";
import moment from "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '@/actions/account';
import { RootState } from '@/reducers/index';
import { Order } from '@/constants/index';

const History: React.FC = () => {
    const dispatch = useDispatch();
    const orderHistory = useSelector((state: RootState) => state.order.orderHistoryStatus);

    useEffect(() => {
        console.log("orderHistory:::",orderHistory)
        dispatch(getOrderHistory());
    }, [dispatch]);

    // 檢查 orderHistory 是否存在，如果不存在或為空，返回 null，不顯示任何內容
    if (!orderHistory || orderHistory.length === 0) {
        return null;
    }

    return (
        <Tab.Panel className="text-white p-5">
            <div className="mx-auto mb-2 sm:mb-6">
                <p className=" text-lg sm:text-xl text-left leading-relaxed sm:leading-relaxed text-white mb-4" > Payment history </p>
            </div>

            <div className="mx-auto mb-2">
                <div className="relative overflow-x-auto shadow-md">
                    <table className="table-auto w-fu-l text-base text-left text-neutral-400">
                        <thead className="text-xs uppercase text-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    DATE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DESCRIBE
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    TOTAL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data.map((item: any) => (
                                <tr key={item.orderID} className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {moment.utc(item.orderUtcDateTime).tz("America/Los_Angeles").format("MMDDYY")}
                                    </th>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center">
                                            <span className="text-white"> {item.productName}</span>
                                            <span className="py-1 px-4 ml-4 rounded-xl text-base font-semibold text-white bg-violet-700" > {item.planName} </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        ${item.totalPrice}
                                    </td>
                                </tr>
                            ))} */}

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