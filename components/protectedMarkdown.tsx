import useProtectedContent from "../hooks/useProtectedContent";
import Markdown, { Props as MarkdownProps } from "./Markdown";

interface Props extends Omit<MarkdownProps, "markdown"> {
  contentName: Parameters<typeof useProtectedContent>[0];
}

const ProtectedMarkdown: React.FunctionComponent<Props> = ({
  contentName,
  ...markdownProps
}) => {
  const { content } = useProtectedContent(contentName);
  if (!content) {
    // TODO: Maybe eventually loading spinner
    return null;
  }
  return <Markdown {...markdownProps} markdown={content} />;
};

export default ProtectedMarkdown;
