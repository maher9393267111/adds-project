import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" />



                <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" /> */}

        <title>Easydeal|Admin</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Easydeal|Admin" />
                {/* <link rel="icon" href="/android-chrome-192x192.png" /> */}
                <link rel="icon"  sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
