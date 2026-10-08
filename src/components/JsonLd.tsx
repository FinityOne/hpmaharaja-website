/**
 * Renders a schema.org JSON-LD block.
 *
 * The payload is built on the server from local content, never from user
 * input, so serialising it into a script tag is safe. `<` is escaped so a
 * string value can never close the script element early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
