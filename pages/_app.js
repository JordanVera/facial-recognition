import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import Appbar from '@/components/Appbar';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Appbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
