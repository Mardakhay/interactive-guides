interface HighlightProps {
  text: string;
  terms: readonly string[];
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function Highlight({ text, terms }: HighlightProps) {
  if (terms.length === 0) return <>{text}</>;

  const escaped = terms.map(escapeRegExp).filter((t) => t.length > 0);
  if (escaped.length === 0) return <>{text}</>;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <mark key={i} className="rounded bg-warning-100 px-0.5 text-warning-800">
              {part}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
