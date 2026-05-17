import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface GetPostProps {
  lang: string;
  limit: number;
  offset: number;
  author_id: number;
  search?: string;
  topic?: string;
  category?: string;
  sortOrder?: "ASC" | "DESC"; // Added this based on our previous backend update
}

export async function getPostsAPI({
  lang,
  limit,
  offset,
  author_id,
  search,
  topic,
  category,
  sortOrder = "DESC",
}: GetPostProps) {
  try {
    // 1. Use URLSearchParams to build the query string safely
    const queryParams = new URLSearchParams({
      lang: lang,
      limit: limit.toString(),
      offset: offset.toString(),
      author_id: author_id.toString(),
      sortOrder: sortOrder,
    });

    // 2. Only add optional filters if they actually have a value
    if (search) queryParams.append("search", search);
    if (topic) queryParams.append("topic", topic);
    if (category) queryParams.append("category", category);

    const res = await fetch(`${API_URL}/posts/get?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Optional: Add cache: 'no-store' if you want fresh data every time
      // or next: { revalidate: 60 } for ISR
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error (${res.status}):`, errorText);
      return []; // Return empty array instead of null to prevent .map errors
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching get Posts API:", error);
    return [];
  }
}
