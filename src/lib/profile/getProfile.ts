import "dotenv/config";
import { cookies } from "next/headers";
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

export default async function getProfile({
  lang,
}: {
  lang: string;
}): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  // console.log(token?.value);
  if (!token?.value) return null;

  try {
    const response = await fetch(`${API_URL}/profile/me/:${lang}`, {
      method: "GET", // Explicitly state method
      headers: {
        // Change this from 'Cookie' to 'Authorization'
        // Authorization: `Bearer ${token.value}`,
        // "Content-Type": "application/json",
        Cookie: `token=${token.value ?? ""}`,
      },
      next: { revalidate: 0 }, // Modern Next.js way to disable caching
    });

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
