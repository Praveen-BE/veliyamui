// Define the structure of your dynamic route segments
interface RouteParams {
  locale: string;
  topic: string;
  titleSlug: string;
  id: string;
}

// Next.js page props interface
interface PageProps {
  params: Promise<RouteParams>;
}

export default async function CategoryPage({ params }: PageProps) {
  // Await the params in Next.js 15+
  const { topic, titleSlug, locale, id } = await params;

  return (
    <div className="p-8">
      <h1>TypeScript Server Component</h1>
      <p>
        Locale: <strong>{locale}</strong>
      </p>
      <p>
        Category: <strong>{topic}</strong>
      </p>
      <p>
        Slug: <strong>{titleSlug}</strong>
      </p>
      <p>
        ID: <strong>{id}</strong>
      </p>
    </div>
  );
}
