import React, { useEffect, useCallback, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordSchema } from '@/validations/forgotPasswordSchema';

const ForgetPassword = () => {

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

    const onSubmitForm = (values: any) => {
        const { email, username, password } = values;

    };

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
                    verificationCode: "",
                }}
                validateOnChange
                validationSchema={ForgotPasswordSchema}
                onSubmit={onSubmitForm}
            >
                {({ values, errors, touched, validateForm }) => {
                    return (
                        <Form>
                            <section id="forgetPassword" className="relative pt-28 md:pt-32 lg:pt-40">
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <div className="text-center mx-auto mb-15 lg:mb-12 max-w-xl">
                                                <h2 className=" text-violet-500 font-black text-3xl sm:text-4xl md:text-4xl text-dark mb-4 " > Forgot Password </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <div className=" max-w-lg mx-auto text-center bg-white rounded-lg relative overflow-hidden py-14 px-8 sm:px-12 md:px-16 " >
                                                <div className="w-full px-2">
                                                    <div className="mb-2">
                                                        <label htmlFor="verificationCode" className="block mb-2 text-sm font-medium text-left text-neutral-900 dark:text-white">Verification code</label>
                                                        <Field
                                                            disabled={isAuthenticating}
                                                            id="verificationCode"
                                                            name="verificationCode"
                                                            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                                            type="text"
                                                            label="verificationCode"
                                                            aria-label="verificationCode"
                                                            aria-required="true"
                                                            aria-invalid={
                                                                errors.verificationCode && touched.verificationCode
                                                                    ? "true"
                                                                    : null
                                                            }
                                                            aria-describedby="verificationCodeAlert"
                                                            placeholder="123456789"
                                                            required
                                                            onFocus={(e: any) => {
                                                                setFocusField(e.target.name);
                                                            }}
                                                        />
                                                        <div>
                                                            {fieldFocusShowError(touched, 'verificationCode') && errors.verificationCode ? (
                                                                <div id="verificationCodeAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.verificationCode}</div>
                                                            ) : null}
                                                        </div>                                                </div>
                                                    <p className="text-sm font-medium text-neutral-900 mb-6">
                                                        <Link href="resetPassword" >
                                                            <a className="hover:underline "> Resend verification code. </a>
                                                        </Link>
                                                    </p>
                                                    <button type="submit" className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Submit</button>
                                                </div>
                                                <p className="text-sm font-medium text-neutral-900 mt-2">
                                                    Return to the
                                                    <Link href="signin" >
                                                        <a className="text-violet-600 hover:underline dark:text-violet-500 ml-1"> login page. </a>
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

export default ForgetPassword;
