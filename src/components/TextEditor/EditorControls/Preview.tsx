type PreviewProps = {
  html: string;
};

export default function Preview({ html }: PreviewProps) {
  return (
    <div className="text-[60%]" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
