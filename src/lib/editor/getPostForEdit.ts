import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Author {
  id: string | number;
  name: string;
  email: string;
}

interface TopicData {
  id: number;
  slug: string;
  name: string;
}

export interface GalleryImage {
  id: string | number;
  url: string;
  alt_text?: string;
  // Add other properties specific to your gallery images table
}

export interface BlogPost {
  id: string | number;
  slug: string;
  published: boolean;
  language_code: string;
  available_languages: string[];
  title: string;
  cover_image: string | null;
  cover_image_alt_tag: string | null;
  lexical_json: Record<string, any> | string; // Use string if it's raw JSON, or Record for parsed
  excerpt: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  author: Author;
  categories: number[] | any[]; // Adjust based on your category object structure
  gallery: GalleryImage[];
  topic: TopicData | any | null;
}

export async function getPostForEdit({
  id,
  lang,
}: {
  id: string | Number;
  lang: string;
}): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/editor/edit/${id}/${lang}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    return (await res.json()) as BlogPost;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
