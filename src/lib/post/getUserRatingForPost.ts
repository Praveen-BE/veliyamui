import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface FetchRatingResponse {
  hasRated: boolean;
  rating: number | null;
  updatedAt: string;
}

export default async function fetchRatingData({
  postId,
}: {
  postId: number | string;
}): Promise<FetchRatingResponse | null | undefined> {
  try {
    const response = await fetch(`${API_URL}/rating/${postId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error("Error fetching rating metrics:", error);
  }
}
