import React, { useEffect, useCallback, useState, useRef, Fragment } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Image from 'next/image';
import Credit from '@/public/images/Credit.svg';
import PayPal from '@/public/images/PayPal.svg';
import { Dialog, Transition } from '@headlessui/react';
import { FormControl, FormLabel, NumberInput, NumberDecrementStepper, NumberInputField, NumberInputStepper, NumberIncrementStepper } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { subscribe, checkout } from '../redux/actions/subscribe';
import { ProductDetailsSchema } from '@/validations/productDetailsSchema';

import BraintreeDropIn from "@/components/features/BraintreeDropIn";
import { useRouter } from 'next/router'

const ProductDetails = () => {

    const [toggleCredit, setToggleCredit] = useState(false)
    const [togglePayPal, setTogglePayPal] = useState(false)
    const [isOpenSendEmail, setIsOpenSendEmail] = useState(false)

    const router = useRouter();
    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
    const [numberOfProducts, setNumberOfProducts] = useState(1);
    const PRICE = 50;

    const dispatch = useDispatch();
    const selectedPlan = useSelector((state: any) => state.subscribe.selectedPlan);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userInfo = localStorage.getItem('userinfo');
                console.log("userInfo:",userInfo);
                if (!userInfo) {
                    router.prefetch('/signin');
                } else {
                    const { token, refreshToken } = JSON.parse(userInfo);
                    console.log("token:",token);
                    console.log("refreshToken:",refreshToken);
                    setToken(token);
                    setRefreshToken(refreshToken);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [router]);


    useEffect(() => {
        const storedPlan = localStorage.getItem('selectedPlan');
        if (storedPlan) {
            dispatch(subscribe(selectedPlan)); // 使用 subscribe action 創建函數來 dispatch 訂閱 action
            console.log("selectedPlan:",selectedPlan);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function closeModalSendEmail() { setIsOpenSendEmail(false) }
    function openModalSendEmail() { setIsOpenSendEmail(true) }

    const handleSubmit = () => {
        // 在這裡處理結帳邏輯，例如顯示 Braintree Drop-in 元件、調用的API，並將所選訂閱方案發送給後端
        dispatch(checkout());
    };

    return (
        <main>
            <Formik
                initialValues={{

                }}
                validateOnChange
                validationSchema={ProductDetailsSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, validateForm }) => {
                    return (
                        <Form>
                            <section id="account" className="relative pt-28 md:pt-32 lg:pt-40">
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <h2 className=" text-white text-center font-black text-3xl sm:text-4xl md:text-4xl text-dark mb-8 " > Select your product </h2>
                                        </div>
                                    </div>

                                    <div className='mx-auto max-w-5xl justify-center px-6 mb-2 xl:px-0 text-white'>
                                        <p>已選擇的訂閱方案：<span className="text-violet-500">{selectedPlan}</span></p>
                                    </div>

                                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                        <div className="rounded-lg md:w-2/3  bg-white shadow-md">
                                            <div className="container p-4">
                                                <div className="flex items-center bg-gray-100 py-2 rounded">
                                                    <div className="w-1/4 p-2">
                                                        <p className="font-bold">Product</p>
                                                    </div>
                                                    <div className="w-1/4 p-2 text-center">
                                                        <p className="font-bold">Price</p>
                                                    </div>
                                                    <div className="w-1/4 p-2 text-center">
                                                        <p className="font-bold">Quantity</p>
                                                    </div>
                                                    <div className="w-1/4 p-2 text-center">
                                                        <p className="font-bold">Total</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center bg-white py-4">
                                                    <div className="w-1/4 p-2">
                                                        <p>Precision X1</p>
                                                    </div>
                                                    <div className="w-1/4 p-2 text-center">
                                                        <p>$ {PRICE}</p>
                                                    </div>
                                                    <div className="w-1/4 p-2 text-center">
                                                        <FormControl>
                                                            <NumberInput defaultValue={1} step={1} max={50} min={1} value={numberOfProducts || ""} onChange={(value: any) => setNumberOfProducts(parseInt(value))}>
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper />
                                                                    <NumberDecrementStepper />
                                                                </NumberInputStepper>
                                                            </NumberInput>
                                                        </FormControl>
                                                    </div>
                                                    <div className="w-1/4 text-center">
                                                        <p>$ {numberOfProducts * PRICE}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="flex flex-wrap items-center justify-center">
                                                <div className="w-full md:w-1/2 px-4">
                                                    <button onClick={() => { setToggleCredit(!toggleCredit); setShowBraintreeDropIn(true); }} disabled={showBraintreeDropIn} className="w-full py-3 text-base font-medium text-neutral-500 border border-neutral-300 rounded-xl text-center hover:text-violet-900 hover:border-neutral-700 transition cursor-pointer">
                                                        <p className="">Pay With Credit</p>
                                                        <div className="flex items-center">
                                                            <div className="relative mx-auto rounded-lg sm:w-40">
                                                                <Image src={Credit} alt="AMEX logo" layout="responsive" objectFit="contain" />
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="w-full md:w-1/2 px-4">
                                                    <button id="submit-payPal" onClick={() => { setTogglePayPal(!togglePayPal); }} className="w-full py-3 text-base font-medium text-neutral-500 border border-neutral-300 rounded-xl text-center hover:text-violet-900 hover:border-neutral-700 transition cursor-pointer">
                                                        <p className="">Check Out With</p>
                                                        <div className="flex items-center">
                                                            <div className="relative mx-auto rounded-lg sm:w-40">
                                                                <Image src={PayPal} alt="PayPal logo" layout="responsive" objectFit="contain" />
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr className="my-4" />

                                            {toggleCredit && (
                                                <div className="w-full px-4 mb-6">
                                                    <div className="grid gap-12 mb-6">
                                                        {showBraintreeDropIn && (
                                                            <BraintreeDropIn
                                                                show={showBraintreeDropIn}
                                                                onPaymentCompleted={() => {
                                                                    setShowBraintreeDropIn(false);
                                                                    setNumberOfProducts(1);
                                                                }}
                                                                token={token} // productDetails 是父組件，它有一個狀態 token。將 token 作為屬性傳遞給子組件 BraintreeDropIn
                                                                refreshToken={refreshToken}
                                                            />
                                                        )}

                                                        {showBraintreeDropIn && (
                                                            <div>
                                                                <h2>Customer Information</h2>
                                                                <div className="">
                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="fname">First Name:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="fname" id="fname" defaultValue="addison" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="lname">Last Name:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="lname" id="lname" defaultValue="Chang" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="phone">Phone:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="phone" id="phone" defaultValue="09999585522" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="ad1">Address1:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="ad1" id="ad1" defaultValue="6435 West Villa Linda Dr" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="ad2">Address2:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="ad2" id="ad2" defaultValue="" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="city">City:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="city" id="city" defaultValue="Olathe" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="state">State:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="state" id="state" defaultValue="Banten" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="zcode">Zip Code:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="zcode" id="zcode" defaultValue="60543" /><br />

                                                                    <label className="mb-2 font-bold text-sm text-gray-900 inline-block w-[100px]" htmlFor="country">Country:</label>
                                                                    <input className="border py-1 px-3 text-sm text-grey-800" type="text" name="country" id="country" defaultValue="US" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {togglePayPal && (
                                                <div className="w-full px-4 mb-6">
                                                    <div className="grid gap-12 mb-6">
                                                        Paypal
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                            <div>
                                                <div className="mb-6 flex justify-between">
                                                    <p className="text-neutral-700">Subtotal</p>
                                                    <p className="text-neutral-700">{'$' + 50 * numberOfProducts}</p>
                                                </div>
                                                <hr className="my-4" />
                                                <div className="flex justify-between">
                                                    <p className="text-lg font-bold">Total</p>
                                                    <div className="">
                                                        <p className="mb-1 text-lg font-bold">{'$' + 50 * numberOfProducts + ' USD'}</p>
                                                        <p className="text-xs text-right text-neutral-700">including VAT</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit" onClick={() => { openModalSendEmail(); }} className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 mt-4">Send Order</button>
                                                <Transition appear show={isOpenSendEmail} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalSendEmail}>
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
                                                                            className="text-lg font-medium leading-6 text-gray-900 mb-2"
                                                                        >
                                                                            Thank you!
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-4">
                                                                            <p className="text-sm text-gray-500">
                                                                                We are processing your order and will send you an email confirmation shortly.
                                                                            </p>
                                                                        </div>
                                                                        <div className="mt-4">
                                                                            <p className="text-sm text-gray-500">
                                                                                Order number:
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                ****-****-****
                                                                            </p>
                                                                        </div>
                                                                        <div className="mt-4">
                                                                            <p className="text-sm text-gray-500">
                                                                                Order confirmation emails will be sent to the following email address: Rabbyxiao@demo.com
                                                                            </p>
                                                                        </div>

                                                                        <div className="mt-8 flex justify-end">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalSendEmail}
                                                                            >
                                                                                Back to subscription
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Form>
                    )
                }}
            </Formik>
        </main>
    );
};

export default ProductDetails;