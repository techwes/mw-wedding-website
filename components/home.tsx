import useProtectedContent from "../hooks/useProtectedContent";
import Markdown from "./Markdown";
import Link from "next/link";

const Home = () => {
  const { content } = useProtectedContent("main.md");
  if (!content) {
    return null;
  }
  return (
    <div>
      <div className="text-center m-3">
        <h1 className="mt-5">
          We hope you will attend our Forest Gala Wedding
        </h1>
        <Link
          href="/rsvp"
          className="fs-1 lh-lg btn btn-info big-button px-5 my-4"
          role="button"
        >
          Click here to update your RSVP
        </Link>
      </div>
      <Markdown markdown={content} />
    </div>
  );
};

export default Home;
