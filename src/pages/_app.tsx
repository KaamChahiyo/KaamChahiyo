import { SessionProvider } from "next-auth/react";
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <AppHeader />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}