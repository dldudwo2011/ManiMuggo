// pages/_app.js
import { SessionProvider } from 'next-auth/react';
import '../src/app/globals.css'
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
