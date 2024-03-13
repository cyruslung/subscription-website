import React, { useEffect, useState } from 'react';
import Layout from '@/components/partials/layout';
import { ChakraProvider } from '@chakra-ui/react';
import ChakraTheme from '@/components/features/chakraTheme';
import Helmet from "react-helmet";
import { Provider, useStore, useSelector } from 'react-redux'
import LoadingMask from '@/components/features/loadingMask'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { ChevronDoubleUpIcon } from '@heroicons/react/20/solid';

import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from "redux/store/index";
import '@/styles/globals/output.css';


const WrappedApp = ({ Component, pageProps }: { Component: any, pageProps: any }) => {

  const store: any = useStore();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const { isAuthenticating } = useSelector(
    (state: any) => ({
      isAuthenticating: state.auth?.isAuthenticating
    })
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        <ChakraProvider theme={ChakraTheme}>
          <Helmet>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="North America's #1 NVIDIA partner." />
            <meta name="keywords" content="Graphics, Motherboards, NVIDIA, NVIDIA Graphics, NVIDIA Motherboards, Intel, Intel Motherboards, Community, Folding, Mods Rigs, Chat, Gaming, Marketplace, Loaner Program, ELP, Newsletter, Contests" />

            <title>Subscription Website</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
            <script src="https://cdn.tailwindcss.com" async />
          </Helmet>

          <Layout>
            {showButton && (
              <Link activeClass="nav-active" className="nav" to={"nav"} spy={true} smooth={true} duration={500} offset={-50} >
                <div className="back-to-top">
                  <ChevronDoubleUpIcon width={38} className="mx-auto mt-1.5" />
                </div>
              </Link>
            )}
            <LoadingMask showMask={isAuthenticating}></LoadingMask>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
};


export default wrapper.withRedux(WrappedApp);
