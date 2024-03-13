
import React, { useEffect, useCallback, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik, ErrorMessage } from "formik";
import UService from "@/services/user.service";
import { getProductContent } from "@/services/product.service";
import { subscribe } from '../redux/actions/subscribe';
import router from 'next/router';

const Subscription = () => {
    const dispatch = useDispatch();
    // const [currentSubscriptionPlan, setcurrentSubscriptionPlan] = useState([]);
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await getProductContent(); // 取得訂閱方案內容，並將結果儲存在data狀態變數中
            if (result.data.isSuccess) {
                setData(result.data.result);
            }
            console.log(result.data.result)
        };
        fetchData();
    }, []);

    // const handleSubmit = useCallback(async () => {
    //     setIsLoading(true);
    //     setErrorMessage("");

    //     try {
    //         const response: any = await UService.getSubscriptionPlan(); // 取得訂閱方案
    //         console.log(response.data);
    //         setIsLoading(false);


    //     } catch (error) {
    //         console.log(error);
    //         setErrorMessage("Subscription failed");
    //         setIsLoading(false);
    //     }
    // }, []);

    const [selectedPlan, setSelectedPlan] = useState('');

    // const handleSubmit = () => {
    //     dispatch(subscribe(selectedPlan));
    // };

    const handleSubscribe = () => {
        // 調用訂閱的API並將選擇的訂閱方案發送給後端
        dispatch(subscribe(selectedPlan));
        setInterval(function(){ router.push('/productDetails'); }, 1500);
    };


    return (
        <main>
            <Formik
                initialValues={{
                    productNO: "",
                }}
                onSubmit={handleSubscribe}
            >
                {({ values, errors, touched, validateForm }) => {
                    return (
                        <Form>
                            <section id="pricing" className=" pt-20 lg:pt-32 pb-12 lg:pb-24 relative z-20 overflow-hidden " >
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <div className="text-center mx-auto mb-15 lg:mb-12 max-w-xl">
                                                <h2 className=" text-violet-500 font-bold text-3xl sm:text-4xl md:text-4xl mb-4 " > Plans and Pricing </h2>
                                                <p className=" text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-white " >
                                                    Offers a variety of plans to meet your PC needs.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center">

                                        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                            <div className="h-[578px] group bg-white hover:bg-violet-500 rounded-xl relative z-10 overflow-hidden border border-white border-opacity-20 py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-10 mb-10 text-center transition duration-300 ease-in-out " >
                                                <span className=" inline-block py-2 px-6 border border-white rounded-xl text-base font-semibold text-white bg-violet-500 group-hover:text-violet-500 group-hover:bg-white uppercase mb-5 " > Years </span>
                                                <span className="text-black group-hover:text-neutral-100 font-black text-xl uppercase block mb-4" > Standard </span>
                                                <p className="text-neutral-600 group-hover:text-violet-300 text-xl line-through"> $0 </p>
                                                <h2 className="font-black text-violet-700 group-hover:text-white mb-5 text-5xl"> Free </h2>
                                                <div className="mb-6">
                                                    <p className=" text-base font-medium text-violet-700 group-hover:text-neutral-100 leading-loose underline mb-1 " > Subscription details below.* </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > 1 User </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > All UI components </p>
                                                </div>
                                                <div className="w-full">
                                                    <a href="productDetails" className=" inline-block text-base font-medium text-white bg-violet-500 border border-white rounded-xl text-center py-4 px-16 group-hover:bg-violet-400 hover:text-violet-900 hover:bg-white hover:border-neutral-50 transition duration-300 ease-in-out " > Download </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* {data.map((item: any) => (
                                            <div className="w-full md:w-1/2 lg:w-1/3 px-2" key={item.orderID} >
                                                <div className="h-[578px] group bg-white hover:bg-violet-500 rounded-xl relative z-10 overflow-hidden border border-white border-opacity-20 py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-10 mb-10 text-center transition duration-300 ease-in-out " >
                                                    <span className=" inline-block py-2 px-6 border border-white rounded-xl text-base font-semibold text-white bg-violet-500 group-hover:text-violet-500 group-hover:bg-white uppercase mb-5 " > {item.planName} </span>
                                                    <span className="text-black group-hover:text-neutral-100 font-black text-xl uppercase block mb-4" > {item.productName} </span>
                                                    <p className="text-neutral-600 group-hover:text-violet-300 text-xl line-through"> {item.msrp} </p>
                                                    <h2 className="font-black text-violet-700 group-hover:text-white mb-5 text-5xl"> {item.sellPrice} </h2>
                                                    <div className="mb-6">
                                                        <p className=" text-base font-medium text-violet-700 group-hover:text-neutral-100 leading-loose underline mb-1 " > Subscription details below.* </p>
                                                        <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > {item.deviceQuantity} User </p>
                                                        <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > All UI components </p>
                                                    </div>
                                                    <div className="w-full">
                                                        {errorMessage && (
                                                            <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
                                                        )}
                                                        <button type="submit" disabled={isLoading} className=" inline-block text-base font-medium text-white bg-violet-500 border border-white rounded-xl text-center py-4 px-11 group-hover:bg-violet-400 hover:text-violet-900 hover:bg-white hover:border-neutral-50 transition duration-300 ease-in-out " >
                                                            {isLoading ? "Processing..." : "Subscribe Now"}
                                                        </button>
                                                        <a href="productDetails">
                                                            <p className=" text-base font-black text-violet-700 group-hover:text-neutral-100 leading-loose underline mt-1 " > Try free for one month ➠ </p>
                                                        </a>
                                                    </div>
                                                    <p className=" text-sm text-black group-hover:text-neutral-100 leading-loose mt-5 " > {item.renewInfo} </p>
                                                </div>
                                            </div>
                                        ))} */}

                                        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                            <div className="h-[578px] group bg-white hover:bg-violet-500 rounded-xl relative z-10 overflow-hidden border border-white border-opacity-20 py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-10 mb-10 text-center transition duration-300 ease-in-out " >
                                                <span className=" inline-block py-2 px-6 border border-white rounded-xl text-base font-semibold text-white bg-violet-500 group-hover:text-violet-500 group-hover:bg-white uppercase mb-5 " > PLUS </span>
                                                <span className="text-black group-hover:text-neutral-100 font-black text-xl uppercase block mb-4" > Precision X1 </span>
                                                <p className="text-neutral-600 group-hover:text-violet-300 text-xl line-through"> $2.59 </p>
                                                <h2 className="font-black text-violet-700 group-hover:text-white mb-5 text-5xl"> $1.99 </h2>
                                                <div className="mb-6">
                                                    <p className=" text-base font-medium text-violet-700 group-hover:text-neutral-100 leading-loose underline mb-1 " > Subscription details below.* </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > 1 User </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > All UI components </p>
                                                </div>
                                                <div className="w-full">
                                                    {errorMessage && (
                                                        <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        id="plan1"
                                                        className={`inline-block text-base font-medium text-white bg-violet-500 border border-white rounded-xl text-center py-4 px-11 group-hover:bg-violet-400 hover:text-violet-900 hover:bg-white hover:border-neutral-50 transition duration-300 ease-in-out ${selectedPlan === 'plan1' ? 'selected' : ''}`}
                                                        disabled={isLoading}
                                                        onClick={() => {setSelectedPlan('plan1'); handleSubscribe();}}
                                                    >
                                                        訂閱方案1
                                                    </button>
                                                    <a href="productDetails">
                                                        <p className=" text-base font-black text-violet-700 group-hover:text-neutral-100 leading-loose underline mt-1 " > Try free for one month ➠ </p>
                                                    </a>
                                                </div>
                                                <p className=" text-sm text-black group-hover:text-neutral-100 leading-loose mt-5 " > Automatically renews at $1.99/year, unless the renewal is cancelled. Price is subject to change. </p>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
                                            <div className="h-[578px] group bg-white hover:bg-violet-500 rounded-xl relative z-10 overflow-hidden border border-white border-opacity-20 py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-10 mb-10 text-center transition duration-300 ease-in-out " >
                                                <span className=" inline-block py-2 px-6 border border-white rounded-xl text-base font-semibold text-white bg-violet-500 group-hover:text-violet-500 group-hover:bg-white uppercase mb-5 " > Advanced </span>
                                                <span className="text-black group-hover:text-neutral-100 font-black text-xl uppercase block mb-4" > Precision X1 </span>
                                                <p className="text-neutral-600 group-hover:text-violet-300 text-xl line-through"> $14.99 </p>
                                                <h2 className="font-black text-violet-700 group-hover:text-white mb-5 text-5xl"> $9.99 </h2>
                                                <div className="mb-6">
                                                    <p className=" text-base font-medium text-violet-700 group-hover:text-neutral-100 leading-loose underline mb-1 " > Subscription details below.* </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > 1 User </p>
                                                    <p className=" text-base font-medium text-black group-hover:text-neutral-100 leading-loose " > All UI components </p>
                                                </div>
                                                <div className="w-full">
                                                    {errorMessage && (
                                                        <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        id="plan1"
                                                        className={`inline-block text-base font-medium text-white bg-violet-500 border border-white rounded-xl text-center py-4 px-11 group-hover:bg-violet-400 hover:text-violet-900 hover:bg-white hover:border-neutral-50 transition duration-300 ease-in-out ${selectedPlan === 'plan2' ? 'selected' : ''}`}
                                                        disabled={isLoading}
                                                        onClick={() => {setSelectedPlan('plan2'); handleSubscribe();}}
                                                    >
                                                        訂閱方案2
                                                    </button>
                                                    <a href="productDetails">
                                                        <p className=" text-base font-black text-violet-700 group-hover:text-neutral-100 leading-loose underline mt-1 " > Try free for one month ➠ </p>
                                                    </a>
                                                </div>
                                                <p className=" text-sm text-black group-hover:text-neutral-100 leading-loose mt-5 " > Automatically renews at $9.99/year, unless the renewal is cancelled. Price is subject to change. </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </Form>
                    )
                }}
            </Formik>
        </main >
    );
};

export default Subscription;
