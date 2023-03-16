import { NextPage } from "next";
import ProtectedMarkdown from "../components/protectedMarkdown";

const AboutPage: NextPage = () => {
  return (
    <main>
      <div className="slideshow mb-3">
        <ProtectedMarkdown contentName="slides.md" />
      </div>
      <ProtectedMarkdown contentName="about.md" />
    </main>
  );
};

export default AboutPage;

export async function getStaticProps() {
  return {
    props: {
      _app: {
        title: "About Madalyn Coryea and Wesley Ripley's Wedding",
      },
    },
  };
}
