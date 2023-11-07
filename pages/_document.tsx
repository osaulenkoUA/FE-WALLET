import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
          <title>Wallet-Home</title>
          <meta charSet="UTF-8"/>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="description" content="Wallet"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="theme-color" content="#cdcdcd"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="apple-mobile-web-app-title" content="PWA Wallet"/>
          <link rel="apple-touch-icon" href="/256px.png" sizes="256x256"/>

      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
            src="/test_fc_VEKS.js"
        />
      </body>
    </Html>
  )
}
