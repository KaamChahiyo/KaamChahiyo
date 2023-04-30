import { SessionProvider } from "next-auth/react";
import { NextAdapter } from "next-query-params";
import { Router } from "next/router";
import { SnackbarProvider } from "notistack";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createContext, useState } from "react";
import { QueryParamProvider } from "use-query-params";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import "../styles/globals.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export const LocationContext = createContext(null);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [location, setLocation] = useState("chitwan");

  const selectLocation = (location) => {
    setLocation(location);
  };

  return (
    <>
      <LocationContext.Provider value={{ location, selectLocation }}>
        <QueryParamProvider adapter={NextAdapter}>
          <SessionProvider session={session}>
            <SnackbarProvider maxSnack={3}>
              <AppHeader />
              <Component {...pageProps} />
              <Footer />
            </SnackbarProvider>
          </SessionProvider>
        </QueryParamProvider>
      </LocationContext.Provider>
    </>
  );
}
