interface PostUserRatingResponse {
  message: string;
  avgRating: number;
  totalRatings: number;
}

export default async function postUserRatingPostAPI({
  postId,
  selectedRating,
}: {
  postId: number | string;
  selectedRating: number;
}): Promise<PostUserRatingResponse | null | undefined> {
  const response = await fetch(`http://localhost:5000/api/rating/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: selectedRating }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit rating.");
  }
  return data;
}
