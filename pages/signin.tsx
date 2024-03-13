import React, { useEffect, useCallback, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { SignInSchema } from '../validations/signinSchema';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { getCurrentUser, login } from "@/services/auth.service";

const SignIn = () => {

    const router = useRouter();
    const [focusField, setFocusField] = useState("");

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [passwordType, setPasswordType] = useState("password");
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    };

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

    const onSubmitForm = useCallback((e: any) => {

        login(e.username, e.password);
        // getCurrentUser(); 
    }, []);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userinfo');
        if (isLoggedIn) {
            // 如果已登錄，導航到指定頁面
            router.prefetch('/precisionX1');
            router.push('/precisionX1');
        } else {
            // 如果未登錄，執行其他邏輯或跳轉到登錄頁面
            router.prefetch('/signin');
            router.push('/signin');
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

    return (
        <main>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validateOnChange
                //validationSchema={SignInSchema}
                onSubmit={onSubmitForm}
            >
                {({ values, errors, touched, validateForm }) => {

                    const { username, password } = values;
                    //setMessage("");
                    //setLoading(true);

                    return (
                        <Form>
                            <section id="signin" className="relative pt-28 md:pt-32 lg:pt-40">
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <div className="text-center mx-auto mb-15 lg:mb-12 max-w-xl">
                                                <h2 className=" text-violet-500 font-black text-3xl sm:text-4xl md:text-4xl text-dark mb-4 " > SignIn </h2>
                                                <p className=" text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-white mb-4 " > Create a username to start your membership </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <div className=" max-w-lg mx-auto text-center bg-white rounded-lg relative overflow-hidden py-14 px-8 sm:px-12 md:px-16 " >
                                                <div className="w-full px-2">
                                                    <div className="mb-6">
                                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white">Username</label>
                                                        <Field
                                                            disabled={isAuthenticating}
                                                            id="username"
                                                            name="username"
                                                            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                                            type="text"
                                                            label="username"
                                                            aria-label="username"
                                                            aria-required="true"
                                                            aria-invalid={
                                                                errors.username && touched.username
                                                                    ? "true"
                                                                    : null
                                                            }
                                                            aria-describedby="usernameAlert"
                                                            placeholder="username"
                                                            required
                                                            onFocus={(e: any) => {
                                                                setFocusField(e.target.name);
                                                            }}
                                                        />
                                                        <div>
                                                            {fieldFocusShowError(touched, 'username') && errors.username ? (
                                                                <div id="usernameAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.username}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 relative">
                                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white">Password</label>
                                                        <Field
                                                            disabled={isAuthenticating}
                                                            id="password"
                                                            name="password"
                                                            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                                            type={passwordType}
                                                            label="Password"
                                                            aria-label="Password"
                                                            aria-required="true"
                                                            aria-invalid={
                                                                errors.password && touched.password
                                                                    ? "true"
                                                                    : null
                                                            }
                                                            aria-describedby="passwordAlert"
                                                            placeholder="•••••••••"
                                                            required
                                                            onFocus={(e: any) => {
                                                                setFocusField(e.target.name);
                                                            }}
                                                        />
                                                        {passwordType == "password" ? <EyeSlashIcon width={20} className="absolute top-9 right-2 cursor-pointer" onClick={togglePasswordVisiblity} /> : <EyeIcon width={20} className="absolute top-9 right-2 cursor-pointer" onClick={togglePasswordVisiblity} />} {" "}
                                                        <div>
                                                            {fieldFocusShowError(touched, 'password') && errors.password ? (
                                                                <div id="passwordAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.password}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-medium mt-6 mb-6 text-neutral-900">
                                                        <Link href="forgotPassword" >
                                                            <a className="hover:underline"> Forget my password </a>
                                                        </Link>
                                                    </p>
                                                    <button type="submit" disabled={isAuthenticating} onClick={validateForm} className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Sign In</button>
                                                </div>
                                                <p className="text-sm font-medium text-neutral-900 mt-2">
                                                    New to Subscription?
                                                    <Link href="https://secure.demo.com/US/signup.asp/" >
                                                        <a className="text-violet-600 hover:underline dark:text-violet-500 ml-1"> Sign Up now.</a>
                                                    </Link>
                                                </p>
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

export default SignIn;
