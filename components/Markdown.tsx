import { useMemo } from "react";
import { micromark } from "micromark";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  markdown: string;
}

const Markdown: React.FunctionComponent<Props> = ({
  markdown,
  ...divProps
}) => {
  const html = useMemo(() => {
    return { __html: micromark(markdown, { allowDangerousHtml: true }) };
  }, [markdown]);
  return <div {...divProps} dangerouslySetInnerHTML={html} />;
};

export default Markdown;
