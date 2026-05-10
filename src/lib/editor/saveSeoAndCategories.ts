import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface SaveSeoData {
  id: number | string;
  excerpt: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  categories: number[];
  language_code: string;
}

interface SaveResponse {
  success: boolean;
  message: string;
}

export async function saveSeoContentAndCategories({
  id,
  excerpt,
  meta_description,
  meta_keywords,
  categories,
  language_code,
}: SaveSeoData): Promise<SaveResponse | null> {
  try {
    const res = await fetch(`${API_URL}/editor/seosave`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        excerpt: excerpt,
        meta_description: meta_description,
        meta_keywords: meta_keywords,
        categories: categories,
        language_code: language_code,
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    return (await res.json()) as SaveResponse;
  } catch (error) {
    console.error("Error at Save LexicalJson and Plain Content:", error);
    return null;
  }
}
