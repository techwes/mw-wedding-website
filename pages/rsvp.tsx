import { NextPage } from "next";
import ProtectedMarkdown from "../components/protectedMarkdown";

const RSVPPage: NextPage = () => {
  return (
    <main>
      <ProtectedMarkdown contentName="rsvp.md" />
    </main>
  );
};

export default RSVPPage;

export async function getStaticProps() {
  return {
    props: {
      _app: {
        title: "RSVP for Madalyn Coryea and Wesley Ripley's Wedding",
      },
    },
  };
}
