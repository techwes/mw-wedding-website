import useProtectedContent from "../hooks/useProtectedContent";
import Markdown from "./Markdown";
import Link from "next/link";

const Home = () => {
  const { content } = useProtectedContent("main.md");
  if (!content) {
    return null;
  }
  return (
    <>
      <Link href="/rsvp" className="fs-1 lh-lg" role="button">
        Click here to RSVP
      </Link>
      <Markdown markdown={content} />
    </>
  );
};

export default Home;
