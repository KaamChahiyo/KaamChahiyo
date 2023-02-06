import { SessionProvider } from "next-auth/react";
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { SnackbarProvider } from 'notistack';
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <SnackbarProvider maxSnack={3}>
          <AppHeader />
          <Component {...pageProps} />
          <Footer />
        </SnackbarProvider>
      </SessionProvider>
    </>
  );
}