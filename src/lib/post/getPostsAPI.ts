import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
interface GetPostProps {
  lang: string;
  limit: number;
  offset: number;
  author_id: number;
}

export async function getPostsAPI({
  lang,
  limit,
  offset,
  author_id,
}: GetPostProps) {
  try {
    const res = await fetch(
      `${API_URL}/posts/get?lang=${lang}&limit=${limit}&offset=${offset}&author_id=${author_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching get Posts API:", error);
    return null;
  }
}
