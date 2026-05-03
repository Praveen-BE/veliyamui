import "dotenv/config";

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface SignupCredentials {
  display_name?: string;
  email?: string;
  password?: string;
  language_code?: string;
}

interface SignupResponse {
  message: string;
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

/**
 * Logs the user in and returns the user data/token
 */
export async function authSignupAPI({
  display_name,
  email,
  password,
  language_code,
}: SignupCredentials): Promise<SignupResponse | null> {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        display_name: display_name,
        email: email,
        password: password,
        language_code: language_code,
      }),
      // Note: next.revalidate is typically used for GET requests.
      // It may be ignored by Next.js for POST requests.
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to login");
    }

    return (await res.json()) as SignupResponse;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}
