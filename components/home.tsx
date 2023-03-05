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
      <h1>RSVP</h1>
      <Link href="/rsvp">RSVP here</Link>
      <Markdown markdown={content} />
    </>
  );
};

export default Home;
