import { NextPage } from "next";
import ProtectedMarkdown from "../components/protectedMarkdown";

const DressCodePage: NextPage = () => {
  return (
    <main>
      <ProtectedMarkdown contentName="dresscode.md" />
    </main>
  );
};

export default DressCodePage;

export async function getStaticProps() {
  return {
    props: {
      _app: {
        title: "Dress Code for Madalyn Coryea and Wesley Ripley's Wedding",
      },
    },
  };
}
