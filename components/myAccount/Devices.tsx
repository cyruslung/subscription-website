import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Tab, Switch, Dialog, Transition } from '@headlessui/react'
import UService from "@/services/user.service";
import moment from "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import { getDevice } from '@/actions/account';
import { RootState } from '@/reducers/index';
import { Device } from '@/constants/index';

const Devices: React.FC = () => {

    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.device.devicesStatus);

    useEffect(() => {
        console.log("device:::",device)
        dispatch(getDevice());
    }, [dispatch]);

    function closeModalDeactivate() { setIsOpenDeactivate(false) }
    function openModalDeactivate() { setIsOpenDeactivate(true) }
    const [isOpenDeactivate, setIsOpenDeactivate] = useState(false)
    const [isreload, setisreload] = useState(true);
    // const [data, setData] = useState([]);
    // const [plan, setplan] = useState("");

    const accountLoginSubmit = useCallback((e: any) => {

    }, []);


    // 檢查 orderHistory 是否存在，如果不存在或為空，返回 null，不顯示任何內容
    if (!device || device.length === 0) {
        return null;
    }

    return (
        <Tab.Panel className="text-white p-5">
            <div className="mx-auto mb-2 sm:mb-6">
                <p className=" text-lg sm:text-xl text-left leading-relaxed sm:leading-relaxed text-white mb-4" > Activated devices </p>
                <p className=" text-xs sm:text-sm text-left leading-relaxed sm:leading-relaxed text-neutral-300" > You can install Precision X1 on more than one computer, activate them (sign in) on two, but use them on only one computer at a time. To activate apps on a third machine, you’ll need to deactivate (sign out) on one of the two current computers first. </p>
            </div>
            <div className="mx-auto mb-2">
                <div className="relative overflow-x-auto shadow-md">
                    <table className="table-auto w-full text-base text-left text-neutral-400">
                        <thead className="text-xs uppercase text-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    DEVICE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DATE ACTIVATED
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {device.map((device: Device) => (
                                <tr className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600" key={device.deviceID}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {device.memberPlanID}
                                    </th>

                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                        {device.deviceName}
                                    </th>
                                    <td className="px-6 py-6">
                                        {moment.utc(device.registeredUtcDateTime).tz("America/Los_Angeles").format("MMDDYY HH:mm")}
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <button type="button" onClick={openModalDeactivate} className=" text-base bg-violet-700 hover:bg-violet-900 rounded-md text-white cursor-pointer transition w-32 py-3" > Deactivate </button>
                                    </td>
                                    <Transition appear show={isOpenDeactivate} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={closeModalDeactivate}>
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
                                                                Deactivate Device?
                                                            </Dialog.Title>
                                                            <hr />
                                                            <div className="mt-2">
                                                                <p className="text-sm text-neutral-500">
                                                                    You are about to deactivate TW-CyrusLung. Apps will no longer work and files will stop syncing on this device.
                                                                </p>
                                                            </div>

                                                            <div className="mt-4">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModalDeactivate}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                    onClick={accountLoginSubmit.bind(this, device.deviceID)}
                                                                >
                                                                    Deactivate
                                                                </button>
                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </Tab.Panel>
    );
};

export default Devices;