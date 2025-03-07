import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

const TITLE = `Ragam '25 - Certificates`;
const DESCRIPTION = `Certificates for Ragam '25 workshops,lectures etc`;
const SOCIAL_BANNER = "https://i.imgur.com/wtUp1cL.jpg";
const SITE_URL = "https://certificates.ragam.co.in";
const SITE_DOMAIN = "certificates.ragam.co.in";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={SOCIAL_BANNER} />

        {/* 1200 x 630px */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={SITE_DOMAIN} />
        <meta property="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={SOCIAL_BANNER} />
      </Head>
      <ToastContainer />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
