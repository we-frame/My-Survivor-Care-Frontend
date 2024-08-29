
export default function RichText({
  content,
  className,
}: {
  content: string;
  className: string;
}) {
  return (
    <p className={className} dangerouslySetInnerHTML={{ __html: content }}></p>
  );
}
