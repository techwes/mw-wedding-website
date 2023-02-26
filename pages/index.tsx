import Head from "next/head";
import { NextPage } from "next";
import PasswordProtect from "../components/passwordProtect";
import Home from "../components/home";

const IndexPage: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Madalyn Coryea and Wesley Ripley's Wedding Website</title>
      </Head>
      <PasswordProtect>
        <Home />
      </PasswordProtect>
    </main>
  );
};

export default IndexPage;
