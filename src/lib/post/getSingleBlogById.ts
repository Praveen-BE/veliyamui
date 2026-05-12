import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface MyBlogsData {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  title: string;
  excerpt: string;
  meta_description: string;
  meta_keywords: string;
  cover_image: string;
  cover_image_alt_tag: string;
  created_at: string;
  updated_at: string;
  author: {
    id: string | number;
    display_name: string;
    email: string;
  };
  categories: any[];
  lexical_json: any;
  topic: {
    id: number;
    slug: string;
    name: string;
  };
}

export async function getSingleBlogById({
  id,
  lang,
}: {
  id: string;
  lang: string;
}): Promise<MyBlogsData> {
  const res = await fetch(`${API_URL}/posts/${id}/${lang}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Use 'no-store' for dynamic dashboard data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await res.json();
}
