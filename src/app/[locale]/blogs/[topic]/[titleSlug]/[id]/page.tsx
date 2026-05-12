import BlogSinlgePost from "@/components/BlogSinglePage";
import { getSingleBlogById } from "@/lib/post/getSingleBlogById";
import React from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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
    openGraph: {
      title: blog.title,
      description: blog.meta_description,
      images: [blog.cover_image],
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}/blogs/${blog.topic.slug}/${blog.slug}/${blog.id}`,
    },
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { id, locale } = await params;
  const post = await getSingleBlogById({ id, lang: locale });
  // console.log(post);
  return <BlogSinlgePost postData={post} />;
};

export default BlogPostPage;
