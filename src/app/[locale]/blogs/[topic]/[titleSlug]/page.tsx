import React from "react";

// Define the structure of your dynamic route segments
interface RouteParams {
  locale: string;
  category: string;
  titleSlug: string;
  id: string;
}

// Next.js page props interface
interface PageProps {
  params: Promise<RouteParams>;
}

const BlogsByTopic = async ({ params }: PageProps) => {
  const { titleSlug } = await params;

  return (
    <div className="p-8">
      <h1>TypeScript Server Component</h1>

      <p>
        Slug: <strong>{titleSlug}</strong>
      </p>
    </div>
  );
};

export default BlogsByTopic;
