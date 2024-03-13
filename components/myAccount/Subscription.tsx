import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Tab, Switch, Dialog, Transition } from '@headlessui/react';
import UService from "@/services/user.service";
import moment from "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import { getSubcriptionStatus } from '@/actions/account';
import { RootState } from '@/reducers/index';
import { Subscrip } from '@/constants/index';

const Subscription: React.FC = () => {
    const productNO = "P000001";
    
    const dispatch = useDispatch();
    const subscripStatus = useSelector((state: RootState) => state.subscripStatus.subscripStatus);

    useEffect(() => {
        console.log("subscripStatus:::",subscripStatus)
        dispatch(getSubcriptionStatus(productNO));
    }, [dispatch]);


    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [isOpenDeactivate, setIsOpenDeactivate] = useState(false)

    const [enabled, setenabled] = useState(false)
    const [toggleDetail, setToggleDetail] = useState(false)

    function closeModalDetail() { setIsOpenDetail(false) }

    function openModalDetail() { setIsOpenDetail(true) }
    function openModalDeactivate() { setIsOpenDeactivate(true) }

    const [data, setData] = useState([]);
    const [isreload, setisreload] = useState(true);


    const autoUpdateSubmit = () => {

    }

    // 檢查 orderHistory 是否存在，如果不存在或為空，返回 null，不顯示任何內容
    if (!subscripStatus || subscripStatus.length === 0) {
        return null;
    }

    return (
        <Tab.Panel className="text-white p-5">
            <div className="mx-auto mb-6 sm:mb-8">
                <p className=" text-lg sm:text-xl text-left leading-relaxed sm:leading-relaxed text-white mb-4" > My subscription license available </p>
                <p className=" text-xs sm:text-sm text-left leading-relaxed sm:leading-relaxed text-neutral-300" > This account is associated with Precision X1 subscription entitlement. </p>
            </div>

            <div className="relative overflow-x-auto shadow-md">
                <table className="table-auto w-full text-base text-left text-neutral-400">
                    <thead className="text-xs uppercase text-neutral-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contract Period
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Detail</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscripStatus.map((subscripStatus: Subscrip) => (

                            <tr key={subscripStatus.orderID} className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white flex items-center">
                                    <span> {subscripStatus.productName}</span>
                                    <span className="py-1 px-4 ml-4 rounded-xl text-base font-semibold text-white bg-violet-700" > {subscripStatus.planName} </span>
                                </th>
                                <td className="px-6 py-6">
                                    Years : {moment.utc(subscripStatus.startUtcDate).tz("America/Los_Angeles").format("MMDDYY")}-{moment.utc(subscripStatus.endUtcDate).tz("America/Los_Angeles").format("MMDDYY")}
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <button type="button" onClick={() => setToggleDetail(!toggleDetail)} className="font-medium text-violet-400 hover:underline"> Detail </button>
                                </td>
                            </tr>
                        ))}
                        {toggleDetail && (
                            <>
                                <tr className="bg-neutral-800">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        Plan
                                    </td>
                                    <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4 text-right">
                                        {(data[0] as any).productName} {(data[0] as any).planName}
                                    </td>
                                </tr>
                                <tr className="bg-neutral-800">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        DATE
                                    </td>
                                    <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4 text-right">
                                        {moment.utc((data[0] as any).StartDate).tz("America/Los_Angeles").format("MMDDYY")}
                                    </td>
                                </tr>
                                <tr className="bg-neutral-800">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        Order No.
                                    </td>
                                    <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4 text-right">
                                        {(data[0] as any).orderNO}
                                        <input type='hidden' id='hidmemberPlanID' name='hidmemberPlanID' value={(data[0] as any).memberPlanID} />
                                    </td>
                                </tr>
                                <tr className="bg-neutral-800">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        Devices
                                    </td>
                                    <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4 text-right">
                                        {(data[0] as any).deviceRegistered} / {(data[0] as any).deviceTotal}
                                    </td>
                                </tr>
                                <tr className="bg-neutral-800">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        Auto renewal
                                    </td>
                                    <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4 text-right">
                                        <form action="/autoUpdate-settings" method="post">
                                            <span className="text-white text-2xl font-bold mr-2">  {(data[0] as any).autoRenew ? 'On' : 'Off'} </span>
                                            <button type="button" onClick={openModalDetail} className="font-medium text-violet-400 hover:underline transition" > Change </button>
                                            <Transition appear show={isOpenDetail} as={Fragment}>
                                                <Dialog as="div" className="relative z-10" onClose={closeModalDetail}>
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                                                    </Transition.Child>

                                                    <div className="fixed inset-0 overflow-y-auto">
                                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                            <Transition.Child
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="opacity-100 scale-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100 scale-100"
                                                                leaveTo="opacity-0 scale-95"
                                                            >
                                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                                    <Dialog.Title
                                                                        as="h3"
                                                                        className="text-lg font-medium leading-6 text-neutral-900 mb-2"
                                                                    >
                                                                        Auto renewal
                                                                    </Dialog.Title>
                                                                    <hr />
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-neutral-500 mb-3">
                                                                            Our Auto-Renewal Plan is designed to save you time, effort and risk by extending your subscription automatically before it expires. Benefits of automatically renewing your licence include:
                                                                        </p>
                                                                        <ul className="list-disc text-sm text-neutral-500 ml-5">
                                                                            <li>Saves you money - With auto-renew you will lock in the price and discounts that you get today</li>
                                                                            <li>Flexibility - You may unsubscribe from this service at any time online by logging into your account</li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="mt-2 flex items-center">
                                                                        <p className="mr-3">
                                                                            Automatically renew my license:
                                                                        </p>
                                                                        <Switch
                                                                            checked={enabled}
                                                                            //onChange={changeEnabled.bind(this,enabled)} 
                                                                            onChange={setenabled}
                                                                            className={`${enabled ? 'bg-violet-700' : 'bg-neutral-700'}
                                                                                                                            relative inline-flex h-[32px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                                        >
                                                                            <span className="sr-only">Use setting</span>
                                                                            <span
                                                                                aria-hidden="true"
                                                                                className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
                                                                                                                                pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                                                        </Switch>
                                                                    </div>

                                                                    <div className="mt-4">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                            onClick={closeModalDetail}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                            onClick={autoUpdateSubmit}
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </Dialog.Panel>
                                                            </Transition.Child>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                        </form>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </Tab.Panel>
    );
};

export default Subscription;