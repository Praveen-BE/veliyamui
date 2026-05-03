import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface UserProfile {
  user: {
    id: string;
    email: string;
    role: string;
    display_name: string;
    bio: string;
    language_code: string;
    created_at: string;
  };
}

export async function getUserProfileByToken({
  lang,
}: {
  lang: string;
}): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_URL}/profile/me/${lang}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    return (await res.json()) as UserProfile;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
