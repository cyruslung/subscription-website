import React from "react";

const LegalNotice = () => {

    return (
        <main>
            <section id="profile" className="relative pt-28 md:pt-32 lg:pt-40">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-15 lg:mb-12 max-w-xl">
                                <h2 className=" text-violet-500 font-black text-3xl sm:text-4xl md:text-4xl text-dark mb-4 " > Legal Notice </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4 text-white">
                            <h3 className=" text-violet-300 font-black text-xl sm:text-2xl md:text-2xl mb-4 " > Cookie List </h3>
                            <p> A cookie is a small piece of data (text file) that a website – when visited by a user – asks your browser to store on your device in order to remember information about you, such as your language preference or login information. Those cookies are set by us and called first-party cookies. We also use third-party cookies – which are cookies from a domain different than the domain of the website you are visiting – for our advertising and marketing efforts. More specifically, we use cookies and other tracking technologies for the following purposes: </p>
                            
                            <hr className="my-8 border-neutral-700" />
                            <h4 className="text-violet-200 font-black text-lg sm:text-xl md:text-xl mb-4">Strictly Necessary Cookies</h4>
                            <p> Cookies required for the operation of our website. They are used to provide content to you, as a user, to navigate our website and to provide services that you have requested, including Customer Support / RMA services or to make a purchase/payment. Such cookies collect personal data in the form of IP address, location data, payment data and identify you for the duration that you are signed into our website. These cookies are deleted when you close your browser session. </p>
                        </div>
                    </div >
                </div >
            </section >
        </main >
    );
};

export default LegalNotice;
