import Head from "next/head";
import { NextPage } from "next";
import PasswordProtect from "../components/passwordProtect";
import RSVP from "../components/rsvp";

const RSVPPage: NextPage = () => {
  return (
    <main>
      <Head>
        <title>RSVP for Madalyn Coryea and Wesley Ripley's Wedding</title>
      </Head>
      <PasswordProtect>
        <RSVP />
      </PasswordProtect>
    </main>
  );
};

export default RSVPPage;
