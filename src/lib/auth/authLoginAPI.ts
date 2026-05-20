import "dotenv/config";

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface LoginCredentials {
  email?: string;
  password?: string;
  language_code?: string;
}

interface LoginResponse {
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
export async function authLoginAPI({
  email,
  password,
  language_code,
}: LoginCredentials): Promise<LoginResponse | null> {
  console.log(email, password, language_code);
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

    return (await res.json()) as LoginResponse;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}
