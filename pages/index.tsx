import { NextPage } from "next";
import Home from "../components/home";

const IndexPage: NextPage = () => {
  return (
    <main>
      <Home />
    </main>
  );
};

export default IndexPage;

export async function getStaticProps() {
  return {
    props: {
      _app: {
        title: "Madalyn Coryea and Wesley Ripley's Wedding Website",
      },
    },
  };
}
