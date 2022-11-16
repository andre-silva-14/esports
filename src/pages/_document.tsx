import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <body className="bg-[#121214] bg-galaxy bg-cover bg-no-repeat">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
