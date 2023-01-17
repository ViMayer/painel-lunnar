import { SessionProvider, useSession } from "next-auth/react";
import { Header } from "../Components/Header";
import "../styles/global.css";
import React, { useState, useEffect } from "react";
export default function App({ Component, session, ...pageProps }) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(false);
  }, []);
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
