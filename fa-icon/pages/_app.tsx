import AuthProvider from "@/context/AuthProvider";
import LoadingProvider from "@/context/LoadingProvider";
import type { AppProps } from "next/app";
import Routing from "routers/routing";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Routing Component={Component} pageProps={pageProps} router={router} />
      </LoadingProvider>
    </AuthProvider>
  );
};

export default MyApp;
