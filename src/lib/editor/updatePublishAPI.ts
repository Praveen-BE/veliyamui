import "dotenv/config";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
interface PublishProps {
  id: string | number;
  lang: string;
  publish: boolean;
}

export async function updatePublishAPI({ id, lang, publish }: PublishProps) {
  try {
    const res = await fetch(`${API_URL}/editor/publish`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        lang: lang,
        isPublish: publish,
      }),
    });
    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching Update Publish:", error);
    return null;
  }
}
