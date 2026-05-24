import "dotenv/config";
import { Cossette_Texte } from "next/font/google";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface MyBlogsData {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  title: string;
  excerpt: string;
  topic: {
    id: number;
    slug: string;
    name: string;
  };
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
  avg_rating: number;
  total_ratings: number;
}

interface APIResponse {
  limit: number;
  offset: number;
  posts: MyBlogsData[];
  total: number;
}

export async function getMyBlogsData({
  lang,
}: {
  lang: string;
}): Promise<APIResponse> {
  const res = await fetch(`${API_URL}/posts/myblogs/${lang}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Use 'no-store' for dynamic dashboard data
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
}
