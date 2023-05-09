import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// import { UsernameWrapper } from "../components/UsernameContext"
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { createContext, useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // <UsernameWrapper>
      <Component {...pageProps} />
    // </UsernameWrapper>
  );
};

export default api.withTRPC(MyApp);
