import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eSports</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
