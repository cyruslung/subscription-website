import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import * as AuthService from "@/services/auth.service";
//import moment from "moment";
import moment from "moment-timezone";

import { getMember } from "@/services/user.service";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Tab } from '@headlessui/react'

import TabList from '@/components/myAccount/TabList';
import Info from '@/components/myAccount/Info';
import Subscription from '@/components/myAccount/Subscription';
import History from '@/components/myAccount/History';
import Devices from '@/components/myAccount/Devices';

const Account = () => {

    const onSubmitForm = (form: any) => { };
    const [reloadState, setreloadState] = useState(false);
    const [currentMember, setcurrentMember] = useState({
        account: '-',
        email: '-',
        lastName: "-",
        firstName: "-",
        mobile: "-",
        customerID: 0
    });

    const userInfo = AuthService.getCurrentUser();

    useEffect(() => {
        getMember()
            .then((response) => {
                if (response.data.isSuccess) {
                    if (response.data.result) {
                        currentMember.account = response.data.result.account;
                        currentMember.email = response.data.result.email;
                        currentMember.customerID = response.data.result.customerID;
                        currentMember.lastName = response.data.result.lastName;
                        currentMember.firstName = response.data.result.firstName;
                        currentMember.account = response.data.result.account;
                        currentMember.mobile = response.data.result.phone;
                        console.log(currentMember.account);
                        setreloadState(true);
                    }
                }
                else {
                    alert(response.data.message);
                }
            });

    }, [currentMember, reloadState]);

    return (
        <main>
            <Formik
                initialValues={{
                    password: "",
                }}
                onSubmit={onSubmitForm}
            >
                {({ values, errors, touched, validateForm }) => {
                    return (
                        <Form>
                            <section id="account" className="relative pt-28 md:pt-32 lg:pt-40">
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <h2 className=" text-white font-black text-3xl sm:text-4xl md:text-4xl text-dark mb-8 ml-5" > My Account </h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-4">
                                        <Tab.Group vertical>
                                            <div className="w-full md:w-1/4 lg:w-1/4 px-4">
                                                <TabList />
                                            </div>
                                            <div className="w-full md:w-3/4 lg:w-3/4 px-4">
                                                <Tab.Panels className="">
                                                    <Info />
                                                    <Subscription />
                                                    <History />
                                                    <Devices />
                                                </Tab.Panels>
                                            </div>
                                        </Tab.Group>
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

export default Account;