import React, { useEffect, useCallback, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { ActivationSchema } from '@/validations/activationSchema';

const Activation = () => {
    
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
                    email: "",
                    activationCode: "",
                }}
                validateOnChange
                validationSchema={ActivationSchema}
                onSubmit={onSubmitForm}
            >
                {({ values, errors, touched, validateForm }) => {
                    return (
                        <Form>
                            <section id="activation" className="relative pt-20 lg:pt-32" >
                                <div className="container">
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full px-4">
                                            <h2 className=" font-medium text-xl sm:text-3xl sm:leading-snug text-white mb-0 sm:mb-6 w-full inline-block bg-violet-900 rounded-md text-center py-4 mt-6" >
                                                This part of the website requires member activation to verify your email address.
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-4">
                                        <div className="w-full md:w-2/3 lg:w-2/3 px-4">
                                            <div className=" lg:flex items-center " >
                                                <div className=" w-full py-12 px-6 sm:px-6 md:p-6 lg:py-9 lg:px-8 text-white " >
                                                    <p className="text-base text-body-color leading-relaxed">
                                                        You can find your activation code in an email titled Activate your Member Account, sent to the email address you registered with. If you did not receive an email within ten minutes, it could be because of the following:
                                                        <ul className="ml-5">
                                                            <li className="list-disc">You are an AOL, Earthlink, Hotmail, Gmail or Yahoo! User and the e-mail was sent to your Junk/Bulk items folder or blocked by a filter. It may also take hours to deliver because of filters. </li>
                                                            <li className="list-disc">You are using a company e-mail address Or educational institution e-mail address and the e-mail was blocked by your System Administrator </li>
                                                            <li className="list-disc">You have not white-listed emails from @demo.com in your 3rd party spam filter. </li>
                                                            <li className="list-disc">You misspelled your e-mail address during registration. </li>
                                                            <li className="list-disc">Your mailbox is full. </li>
                                                        </ul>
                                                        If you believe there may be an issue, or you have waited for 24 hours, please contact our Customer Service through our website or by calling us at 888-881 (3842) option 2, Monday through Friday, between the hours of 9AM to 5:30PM PST so we can correct this issue right away.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/3 lg:w-1/3 px-4">
                                            <div className=" mx-auto text-center relative overflow-hidden py-12 px-6 md:px-2 " >
                                                <div className="w-full">
                                                    <div className="mb-2">
                                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-left text-white dark:text-white">Email</label>
                                                        <Field
                                                            disabled={isAuthenticating}
                                                            id="email"
                                                            name="email"
                                                            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                                            type="text"
                                                            label="email"
                                                            aria-label="email"
                                                            aria-required="true"
                                                            aria-invalid={
                                                                errors.email && touched.email
                                                                    ? "true"
                                                                    : null
                                                            }
                                                            aria-describedby="emailAlert"
                                                            placeholder="Email Address"
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
                                                    <p className="text-sm font-medium text-white mb-6">
                                                        <Link href="resetPassword" >
                                                            <a className="hover:underline "> Resend verification code. </a>
                                                        </Link>
                                                    </p>
                                                    <div className="mb-12">
                                                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-left text-white dark:text-white">Activation Code</label>
                                                        <Field
                                                            disabled={isAuthenticating}
                                                            id="activationCode"
                                                            name="activationCode"
                                                            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                                                            type="text"
                                                            label="activationCode"
                                                            aria-label="activationCode"
                                                            aria-required="true"
                                                            aria-invalid={
                                                                errors.activationCode && touched.activationCode
                                                                    ? "true"
                                                                    : null
                                                            }
                                                            aria-describedby="activationCodeAlert"
                                                            placeholder="123456789"
                                                            required
                                                            onFocus={(e: any) => {
                                                                setFocusField(e.target.name);
                                                            }}
                                                        />
                                                        <div>
                                                            {fieldFocusShowError(touched, 'activationCode') && errors.activationCode ? (
                                                                <div id="activationCodeAlert" aria-atomic="true" className="block mt-1 text-xs font-normal text-left text-red-500 dark:text-white">{errors.activationCode}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Submit</button>
                                                </div>
                                                <p className="text-sm font-medium text-white mt-2">
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

export default Activation;
