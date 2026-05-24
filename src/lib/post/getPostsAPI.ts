import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface GetPostProps {
  lang: string;
  limit: number;
  offset: number;
  author_id: number;
  search?: string;
  topic?: string;
  category?: string;
  sortOrder?: "ASC" | "DESC";
  sortBy?: "date" | "toprated" | "lowrated"; // Changed from any to explicit options
}

export async function getPostsAPI({
  lang,
  limit,
  offset,
  author_id,
  search,
  topic,
  category,
  sortOrder,
  sortBy,
}: GetPostProps) {
  try {
    // 1. Initialize query params with baseline parameters that are guaranteed to exist
    const queryParams = new URLSearchParams({
      lang: lang,
      limit: limit.toString(),
      offset: offset.toString(),
      author_id: author_id.toString(),
    });

    // 2. Only append sorting parameters if they are explicitly passed
    if (sortOrder) queryParams.append("sortOrder", sortOrder);
    if (sortBy) queryParams.append("sortBy", sortBy);

    // 3. Only add optional filters if they actually have content
    if (search && search.trim() !== "") queryParams.append("search", search);
    if (topic) queryParams.append("topic", topic);
    if (category) queryParams.append("category", category);

    const res = await fetch(`${API_URL}/posts/get?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Fetches dynamic live data on every server request
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error (${res.status}):`, errorText);
      // Return a clean fallback structure matching your new backend response layout
      return { total: 0, limit, offset, posts: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching get Posts API:", error);
    // Return standard fallback object format to avoid structural crashes downstream
    return { total: 0, limit, offset, posts: [] };
  }
}
