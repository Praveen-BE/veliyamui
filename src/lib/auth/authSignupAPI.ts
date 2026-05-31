import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface SignupCredentials {
  display_name?: string;
  email?: string;
  password?: string;
  language_code?: string;
  policy_version: string;
}

/**
 * Logs the user in and returns the user data/token
 */
export async function authSignupAPI({
  display_name,
  email,
  password,
  language_code,
  policy_version,
}: SignupCredentials): Promise<any | void> {
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
        policy_version: policy_version,
      }),
      // Note: next.revalidate is typically used for GET requests.
      // It may be ignored by Next.js for POST requests.
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to signup");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}
