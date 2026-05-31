// lib/auth/authVerifyEmailAPI.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface VerifyEmailResponse {
  success?: boolean;
  error?: string;
}

export async function authVerifyEmailAPI(
  token: string,
): Promise<VerifyEmailResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "verification_failed" };
    }

    return { success: true };
  } catch {
    return { error: "verification_failed" };
  }
}
