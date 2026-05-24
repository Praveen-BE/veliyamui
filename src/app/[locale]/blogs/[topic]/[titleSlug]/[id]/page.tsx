import BlogSinlgePost from "@/components/BlogSinglePage";
import BlogSinglePageClient from "@/components/BlogSinglePageClient";
// import CommentSection from "@/components/CommentSection";
// import RatingSection from "@/components/RatingComponent";
import { getSingleBlogById } from "@/lib/post/getSingleBlogById";

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

// ✅ generateMetadata - async API call here
export async function generateMetadata({ params }: PageProps) {
  const { id, locale } = await params;

  const blog = await getSingleBlogById({ id, lang: locale });
  // const blog = res[0];
  return {
    title: blog.title,
    description: blog.meta_description,
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: blog.title,
      description: blog.meta_description,
      images: [blog.cover_image],
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}/blogs/${blog.topic.slug}/${blog.slug}/${blog.id}`,
      languages: {
        en: `/en/blog/${blog.topic.slug}/${blog.slug}/${blog.id}`,
        ta: `/ta/blog/${blog.topic.slug}/${blog.slug}/${blog.id}`,
        "x-default": `/blog/${blog.topic.slug}/${blog.slug}/${blog.id}`, // fallback/default
      },
    },
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { id, locale } = await params;
  const post = await getSingleBlogById({ id, lang: locale });
  return (
    <section className="sm:m-6 max-w-4xl">
      <BlogSinlgePost postData={post} />
      <BlogSinglePageClient
        id={id}
        avg_rating={post.avg_rating}
        total_ratings={post.total_ratings}
      />
    </section>
  );
};

export default BlogPostPage;
