import useProtectedContent from "../hooks/useProtectedContent";
import Markdown from "./Markdown";

const RSVP: React.FunctionComponent<{}> = () => {
  const { content } = useProtectedContent("rsvp.md");
  return <>{content && <Markdown markdown={content} />}</>;
};

export default RSVP;
