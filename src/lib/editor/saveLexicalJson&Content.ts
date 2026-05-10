import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface SavePostData {
  id: number | string;
  title: string;
  slug_word: string;
  lexicalJson: string;
  content: string;
  language_code: string;
  topic_id: number;
  cover_image_alt_tag: string;
}

interface SaveResponse {
  message: string;
}

export async function saveBlogPostLexicalJsonAndContent({
  id,
  title,
  slug_word,
  lexicalJson,
  content,
  language_code,
  topic_id,
  cover_image_alt_tag,
}: SavePostData): Promise<SaveResponse | null> {
  try {
    const res = await fetch(`${API_URL}/editor/postsave`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
        slug_word: slug_word,
        lexical_json: lexicalJson,
        content: content,
        language_code: language_code,
        topic_id: topic_id,
        cover_image_alt_tag: cover_image_alt_tag,
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
