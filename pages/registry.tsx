import { NextPage } from "next";
import ProtectedMarkdown from "../components/protectedMarkdown";

const RegistryPage: NextPage = () => {
  return (
    <main>
      <ProtectedMarkdown contentName="registry.md" />
    </main>
  );
};

export default RegistryPage;

export async function getStaticProps() {
  return {
    props: {
      _app: {
        title: "Registry for Madalyn Coryea and Wesley Ripley's Wedding",
      },
    },
  };
}
