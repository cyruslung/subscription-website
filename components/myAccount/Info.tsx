import React, { useEffect, useCallback, useState, useRef, Fragment } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from 'next/link';
import { Tab, Switch, Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { MyAccountSchema } from '@/validations/myAccountSchema';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import UService from "@/services/user.service";
import * as AuthService from "@/services/auth.service";


const Info = () => {


    // const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.user);

    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);

    // const handleUpdateEmail = async () => {
    //     const email = 'example@example.com'; // 替換為要更新的電子信箱
    //     dispatch(updateEmail(email));
    //     dispatch(getUser());
    // };

    // const handleUpdatePassword = async () => {
    //     const password = 'newPassword'; // 替換為要更新的密碼
    //     dispatch(updateName(password));
    //     dispatch(getUser());
    // };

    // const handleUpdateName = async () => {
    //     const name = 'New Name'; // 替換為要更新的名字
    //     dispatch(updateName(name));
    //     dispatch(getUser());
    // };

    // const handleUpdateMobile = async () => {
    //     const mobile = '1234567890'; // 替換為要更新的手機號碼
    //     dispatch(updateMobile(mobile));
    //     dispatch(getUser());
    // };

    // return (
    //     <div>
    //         {user && (
    //             <div>
    //                 <p>User Name: {user.name}</p>
    //                 <p>Email: {user.email}</p>
    //                 <p>Password: {user.password}</p>
    //                 <p>Mobile: {user.mobile}</p>
    //             </div>
    //         )}
    //         <button onClick={handleUpdateEmail}>Update Email</button>
    //         <button onClick={handleUpdatePassword}>Update Password</button>
    //         <button onClick={handleUpdateName}>Update Name</button>
    //         <button onClick={handleUpdateMobile}>Update Mobile</button>
    //     </div>
    // );


    const [isOpenEmail, setIsOpenEmail] = useState(false)
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenMobile, setIsOpenMobile] = useState(false)

    const [isOpenVeried, setIsOpenVeried] = useState(false)

    const [oldPasswordType, setOldPasswordType] = useState("password");
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [oldPasswordShown, setOldPasswordShown] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false);
    const toggleOldPasswordVisiblity = () => {
        setOldPasswordShown(oldPasswordShown ? false : true);
        if (oldPasswordType === "password") {
            setOldPasswordType("text")
            return;
        }
        setOldPasswordType("password")
    };
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    };
    const toggleConfirmPasswordVisiblity = () => {
        setconfirmPasswordShown(confirmPasswordShown ? false : true);
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text")
            return;
        }
        setConfirmPasswordType("password")
    };

    function closeModalEmail() { setIsOpenEmail(false) }
    function closeModalPassword() { setIsOpenPassword(false) }
    function closeModalProfile() { setIsOpenProfile(false) }
    function closeModalMobile() { setIsOpenMobile(false) }

    function closeModalVeried() { setIsOpenVeried(false) }

    function openModalEmail() { setIsOpenEmail(true) }
    function openModalPassword() { setIsOpenPassword(true) }
    function openModalProfile() { setIsOpenProfile(true) }
    function openModalMobile() { setIsOpenMobile(true) }

    function openModalVeried() { setIsOpenVeried(true) }

    function accountLoginSubmit() { }

    const [ip, setIP] = useState('');
    const [isreload, setisreload] = useState(true);
    const [dataVeried, setDataVeried] = useState([]);

    const refFirstName = useRef(null);

    //creating function to load ip address from the API
    //const getIpData = async () => {
    //  debugger;
    //  const res = await UService.getClientIP();
    //  console.log(res.data);
    //  setIP(res.data.IPv4)
    //}

    const [focusField, setFocusField] = useState("");
    const { authStatus, isAuthenticating, userIID, statusCode, errorMessage, apiSuccess } = useSelector(
        (state: any) => ({
            authStatus: state?.auth?.authStatus,
            isAuthenticating: state.auth?.isAuthenticating,
            userIID: state?.auth?.iid,
            statusCode: state?.misc?.statusCode,
            errorMessage: state?.misc?.message,
            apiSuccess: state?.misc?.success
        })
    );

    const getIpData = useCallback(() => {
        const fetchData = async () => {
            const result: any = await UService.getClientIP();
            //alert(result.data);
            if (result.data) {
                setIP(result.data.IPv4)
            }
        };
        fetchData();
    }, []);

    const onSubmitForm = (values: any) => {
        const { email, confirmEmail, username, password } = values;

    };

    const changeEmailSubmit = useCallback((email: any, confirmEmail: any) => {
        let clientIP = "";
        UService.getClientIP()
            .then((response) => {
                if (response.data) {
                    clientIP = response.data.IPv4;
                }

                let errMessage = '';
                if (email.value.length <= 8 || confirmEmail.value.length <= 8)
                    errMessage = 'fill the data first!';
                if (email.value != confirmEmail.value)
                    errMessage = 'New Email Address, not equal Re-Type New Email Address';
                if (errMessage.length > 0) {
                    alert(errMessage);
                }
                else {
                    const fetchData = async () => {
                        const result: any = await UService.updateEmail(confirmEmail.value, clientIP);
                        if (result.data.isSuccess) {
                            //alert('Email change successed!') ;  
                            setDataVeried(result.data.result)
                            setIsOpenEmail(false);
                            setIsOpenVeried(true);
                        }
                        else {
                            alert(result.data.message);
                        }
                        console.log(result.data.message)
                    };
                    fetchData();
                }
            })


    }, []);

    const updateVeriedSubmit = useCallback((verificationID: any, newEmail: any, prefixCode: any, suffixCode: any) => {
        let errMessage = '';

        if (errMessage.length > 0) {
            alert(errMessage);
        }
        else {
            const fetchData = async () => {

                const result: any = await UService.verifiEmail(verificationID, newEmail, prefixCode, suffixCode.value);
                if (result.data.isSuccess) {
                    alert('Email veried successed!');
                    setIsOpenVeried(false);
                    setIsOpenEmail(false);
                    setisreload(true);
                }
                else {
                    alert(result.data.message);
                }
                console.log(result.data.message)
            };
            fetchData();
        }
    }, []);

    const changePasswordSubmit = useCallback((oldPassword: any, newPassword: any, confirmPassword: any) => {
        //
        //debugger;
        //alert(newPassword.value);     
        //alert(confirmPassword.value);
        let errMessage = '';
        if (oldPassword.value.length <= 8 || newPassword.value.length <= 8 || confirmPassword.value.length <= 8)
            errMessage = 'fill the data first!';
        if (newPassword.value != confirmPassword.value)
            errMessage = 'New Password must euqal confirm Password';
        if (errMessage.length > 0) {
            alert(errMessage);
        }
        else {
            const fetchData = async () => {
                const result: any = await UService.updatePassword(oldPassword.value, newPassword.value);
                if (result.data.isSuccess) {
                    alert('Password change successed!');
                    AuthService.logout();

                }
                else {
                    alert(result.data.message);
                }
                console.log(result.data.message)
            };
            fetchData();
        }
    }, []);

    const fieldFocusShowError = (touched: any, checkField: string) => {
        if (!focusField) return;
        if (checkField === focusField) {
            if (!touched[checkField])
                touched[checkField] = true;
        }
        return touched[checkField];
    }
    const changeNameSubmit = useCallback((firstName: any, lastName: any) => {
        debugger;
        let errMessage = '';


        if (firstName.value.length <= 1 || lastName.value.length <= 1)
            errMessage = 'fill the data first!';
        if (errMessage.length > 0) {
            alert(errMessage);
        }
        else {
            debugger;
            const fetchData = async () => {
                const result: any = await UService.updateName(firstName.value, lastName.value);
                if (result.data.isSuccess) {
                    alert('Name change successed!');
                    setIsOpenProfile(false);
                    setisreload(true);
                }
                else {
                    alert(result.data.message);
                }
                console.log(result.data.message)
            };
            fetchData();
        }
    }, []);


    const changeMobileSubmit = useCallback((phoneCode: any, phoneNo: any) => {
        debugger;
        let errMessage = '';
        if (phoneCode.value.length <= 1 || phoneNo.value.length <= 5)
            errMessage = 'fill the data first!';
        if (errMessage.length > 0) {
            alert(errMessage);
        }
        else {
            const fetchData = async () => {
                const result: any = await UService.updateMobile(phoneCode.value, phoneNo.value);
                if (result.data.isSuccess) {
                    alert('Mobile change successed!');
                    setIsOpenMobile(false);
                    setisreload(true);
                }
                else {
                    alert(result.data.message);
                }
                console.log(result.data.message)
            };
            fetchData();
        }
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {


        const fetchData = async () => {
            const result: any = await UService.getMember();
            if (result.data.isSuccess) {
                setData(result.data.result);
                setisreload(false);
            }
            console.log(result.data.result)
        };
        fetchData();

    }, [isreload]);

    return (
        <Formik
            initialValues={{
                email: "",
                confirmEmail: "",
                firstName: "",
                lastName: "",
                oldPassword: "",
                password: "",
                confirmPassword: "",
                phoneCode: "",
                phoneNo: ""
            }}
            validateOnChange
            validationSchema={MyAccountSchema}
            onSubmit={onSubmitForm}
        >
            {({ values, errors, touched, validateForm }) => {
                return (
                    <Form>
                        <Tab.Panel className="text-white">
                            <div className="mx-auto mb-2">
                                <div className="relative overflow-x-auto shadow-md">
                                    <table className="table-auto w-full text-base text-left text-neutral-400">
                                        <tbody>
                                            <tr className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                                    Email
                                                </th>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col justify-start">
                                                        <div className=" text-lg text-neutral-300" >
                                                            {(data as any).email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button type="button" onClick={openModalEmail} className=" text-xl bg-violet-700 hover:bg-violet-900 rounded-xl text-white cursor-pointer transition w-32 py-3" > Change </button>
                                                </td>
                                                <Transition appear show={isOpenEmail} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalEmail}>
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
                                                                            Change E-mail address
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-neutral-500">
                                                                                To update your email address, please enter your new email address, and re-type the new email address to confirm it.
                                                                            </p>
                                                                            <div className="">
                                                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="email"
                                                                                    name="email"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="email"
                                                                                    aria-label="email"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.email && touched.email
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="email"
                                                                                    placeholder="New Email Address"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'email') && errors.email ? (
                                                                                        <div id="emailAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.email}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                            <div className="">
                                                                                <label htmlFor="confirmEmail" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="confirmEmail"
                                                                                    name="confirmEmail"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="confirmEmail"
                                                                                    aria-label="confirmEmail"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.confirmEmail && touched.confirmEmail
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="confirmEmail"
                                                                                    placeholder="Re-Type New Email Address"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'confirmEmail') && errors.confirmEmail ? (
                                                                                        <div id="confirmEmailAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.confirmEmail}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalEmail}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                                onClick={changeEmailSubmit.bind(this, (document.getElementById("email") as any), (document.getElementById("confirmEmail") as any))}
                                                                            //onClick={() => alert(confirmEmail.value)}
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>

                                                <Transition appear show={isOpenVeried} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalVeried}>
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
                                                                            Veried E-mail
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-neutral-500">
                                                                                To update your email address, please enter your new email address, and re-type the new email address to confirm it.
                                                                            </p>
                                                                            <div className="">

                                                                                {(dataVeried as any).prefix} -
                                                                                <label htmlFor="emailVeriedCode" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    id="emailVeriedCode"
                                                                                    name="emailVeriedCode"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="emailVeriedCode"
                                                                                    aria-label="emailVeriedCode"
                                                                                    aria-required="true"
                                                                                    aria-describedby="emailVeriedCode"
                                                                                    placeholder="Email VeriedCode"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalVeried}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                                onClick={updateVeriedSubmit.bind(this, (dataVeried as any).verificationID, (dataVeried as any).newEmail, (dataVeried as any).prefix, (document.getElementById("emailVeriedCode") as any))}
                                                                            //onClick={() => alert(this.emailVeriedCode.value)}
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </tr>

                                            <tr className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                                    Current password
                                                </th>
                                                <td className="px-6 py-6">
                                                    •••••••••••••
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button type="button" onClick={openModalPassword} className=" text-xl bg-violet-700 hover:bg-violet-900 rounded-xl text-white cursor-pointer transition w-32 py-3" > Change </button>
                                                </td>
                                                <Transition appear show={isOpenPassword} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalPassword}>
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
                                                                            Change password
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-neutral-500">
                                                                                n order to change your password you will need to re-enter your current password below, type the new password you want to have, and then re-type the new password to confirm it. If you have any questions or problems with this page please contact us at webmaster@subscription.com.
                                                                            </p>
                                                                            <div className="relative">
                                                                                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="oldPassword"
                                                                                    name="oldPassword"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type={oldPasswordType}
                                                                                    label="oldPassword"
                                                                                    aria-label="oldPassword"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.oldPassword && touched.oldPassword
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="oldPasswordAlert"
                                                                                    placeholder="Old Password"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                {oldPasswordType == "password" ? <EyeSlashIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={toggleOldPasswordVisiblity} /> : <EyeIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={toggleOldPasswordVisiblity} />} {" "}
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'oldPassword') && errors.oldPassword ? (
                                                                                        <div id="oldPasswordAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.oldPassword}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                            <div className="relative">
                                                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="password"
                                                                                    name="password"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type={passwordType}
                                                                                    label="password"
                                                                                    aria-label="password"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.password && touched.password
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="passwordAlert"
                                                                                    placeholder="New Password"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                {passwordType == "password" ? <EyeSlashIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={togglePasswordVisiblity} /> : <EyeIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={togglePasswordVisiblity} />} {" "}
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'password') && errors.password ? (
                                                                                        <div id="passwordAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.password}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                            <div className="relative">
                                                                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="confirmPassword"
                                                                                    name="confirmPassword"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type={confirmPasswordType}
                                                                                    label="confirmPassword"
                                                                                    aria-label="confirmPassword"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.confirmPassword && touched.confirmPassword
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="confirmPasswordAlert"
                                                                                    placeholder="Confirm Password"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                {confirmPasswordType == "password" ? <EyeSlashIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={toggleConfirmPasswordVisiblity} /> : <EyeIcon width={20} className="absolute top-3 right-2 cursor-pointer" onClick={toggleConfirmPasswordVisiblity} />} {" "}
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'confirmPassword') && errors.confirmPassword ? (
                                                                                        <div id="confirmPasswordAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.confirmPassword}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalPassword}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                                onClick={changePasswordSubmit.bind(this, (document.getElementById("oldPassword") as any), (document.getElementById("newPassword") as any), (document.getElementById("confirmPassword") as any))}
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </tr>

                                            <tr className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                                    Profile name
                                                </th>
                                                <td className="px-6 py-6">
                                                    {(data as any).firstName}  {(data as any).lastName}
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button type="button" onClick={openModalProfile} className=" text-xl bg-violet-700 hover:bg-violet-900 rounded-xl text-white cursor-pointer transition w-32 py-3" > Change </button>
                                                </td>
                                                <Transition appear show={isOpenProfile} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalProfile}>
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
                                                                            Change profile name
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-2">
                                                                            <div className="">
                                                                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="lastName"
                                                                                    name="lastName"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="lastName"
                                                                                    aria-label="lastName"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.lastName && touched.lastName
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="lastNameAlert"
                                                                                    placeholder="Last Name"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'lastName') && errors.lastName ? (
                                                                                        <div id="lastNameAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.lastName}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                            <div className="">
                                                                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="firstName"
                                                                                    name="firstName"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="firstName"
                                                                                    aria-label="firstName"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.firstName && touched.firstName
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="firstName"
                                                                                    placeholder="First Name"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'firstName') && errors.firstName ? (
                                                                                        <div id="firstNameAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.firstName}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalProfile}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                                onClick={changeNameSubmit.bind(this, (document.getElementById("firstName") as any), (document.getElementById("lastName") as any))}
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
                                            </tr>

                                            <tr className="border-t bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                                    Mobile
                                                </th>
                                                <td className="px-6 py-6">
                                                    {(data as any).phoneCode} {(data as any).phone}
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button type="button" onClick={openModalMobile} className=" text-xl bg-violet-700 hover:bg-violet-900 rounded-xl text-white cursor-pointer transition w-32 py-3" > Add </button>
                                                </td>
                                                <Transition appear show={isOpenMobile} as={Fragment}>
                                                    <Dialog as="div" className="relative z-10" onClose={closeModalMobile}>
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
                                                                            Add your phone number
                                                                        </Dialog.Title>
                                                                        <hr />
                                                                        <div className="mt-2">
                                                                            <div className="">
                                                                                <label htmlFor="phoneCode" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="phoneCode"
                                                                                    name="phoneCode"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="phoneCode"
                                                                                    aria-label="phoneCode"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.phoneCode && touched.phoneCode
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="phoneCode"
                                                                                    placeholder="Phone Code"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'phoneCode') && errors.phoneCode ? (
                                                                                        <div id="phoneCodeAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.phoneCode}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                            <div className="">
                                                                                <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white"></label>
                                                                                <Field
                                                                                    disabled={isAuthenticating}
                                                                                    id="phoneNo"
                                                                                    name="phoneNo"
                                                                                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                                                                    type="text"
                                                                                    label="phoneNo"
                                                                                    aria-label="phoneNo"
                                                                                    aria-required="true"
                                                                                    aria-invalid={
                                                                                        errors.phoneNo && touched.phoneNo
                                                                                            ? "true"
                                                                                            : null
                                                                                    }
                                                                                    aria-describedby="phoneNo"
                                                                                    placeholder="Phone No"
                                                                                    required
                                                                                    onFocus={(e: any) => {
                                                                                        setFocusField(e.target.name);
                                                                                    }}
                                                                                />
                                                                                <div>
                                                                                    {fieldFocusShowError(touched, 'phoneNo') && errors.phoneNo ? (
                                                                                        <div id="phoneNoAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.phoneNo}</div>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 mr-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                                                                                onClick={closeModalMobile}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                                                                onClick={changeMobileSubmit.bind(this, (document.getElementById("phoneCode") as any), (document.getElementById("phoneNo") as any))}
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default Info;