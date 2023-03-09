import "bootstrap/dist/css/bootstrap.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import PasswordProtect from "../components/passwordProtect";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {pageProps._app?.title && <title>{pageProps._app.title}</title>}
      </Head>
      <PasswordProtect>
        <Component {...pageProps} />
      </PasswordProtect>
    </>
  );
}
